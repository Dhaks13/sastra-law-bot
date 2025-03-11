from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.db import connection
from .serializers import *
import pdfplumber
import requests
from django.http import JsonResponse

def get_ml_response(input_text):
    response = requests.post('http://172.16.13.81:5000/generate', json={'input': input_text})
    data = response.json()
    return data


def get_ml_response1(input_text):
    response = requests.post('http://172.16.13.81:5001/generate', json={'input': input_text})
    data = response.json()
    return data

def generate_title(input_text):
    response = requests.post('http://172.16.13.81:5000/title_gen', json={'input': input_text})
    data = response.json()
    return data

# def get_dss_response(input_text):
#     response = requests.post('http://172.16.13.81:5002/generate',json={'input': input_text})
#     data = response.json()
#     print(data)
#     return data

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text


class ValidateUsername(APIView):    
    def post(self, request, *args, **kwargs):
        if request.method == "POST":
            received_data = request.data  # json data
            username = received_data.get('username', '')

            cursor = connection.cursor()
            cursor.execute(
                f"CALL validate_username('{username}');")
            data = dictfetchall(cursor)
            if data!=[]:
                return JsonResponse({"success": False, 'data': data})
            return JsonResponse({"success": True, 'data': data})

class ValidateEmail(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == "POST":

            received_data = request.data  
            email = received_data.get('email', '')

            cursor = connection.cursor()
            cursor.execute(f"CALL validate_email('{email}');")
            data = dictfetchall(cursor)
            if data!=[]:
                return JsonResponse({"success": False, 'data': data})
        return JsonResponse({"success": True, 'data': data})

class Signup(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            serializer = UserModelSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"success": True, "data": serializer.data})
            return JsonResponse({"success": False, "data": serializer.errors})
        
class Login(APIView):
    def post(self,request,*args,**kwargs):
        received_data = request.data
        username = received_data.get('username', '')
        password = received_data.get('password', '')

        cursor = connection.cursor()
        cursor.execute(f"CALL login_user('{username}', '{password}');")
        data = dictfetchall(cursor)
        if data:
            return JsonResponse({"success": True, 'data': data})
        return JsonResponse({"success": False, 'data': data})
    
# class pdfextract(APIView):
#     def post(self, request, *args, **kwargs):
#         if request.method == "POST":
#             received_data = request.data
#             data = extract_text_from_pdf(received_data['file'])
#             if data:
#                 res = get_dss_response(data)
#                 return JsonResponse({"success": True, 'data': res})
#             return JsonResponse({"success": False, 'data': data})
        
class lawbot(APIView):
    def post(self, request, *args, **kwargs):
        response = ''
        if request.method == "POST":
            received_data = request.data
            user = received_data['user']
            text = received_data['text']
            title_id = received_data['title_id']
            # Check
            if title_id == -1:
                get_title = generate_title(text)
                if get_title:
                    print(get_title)
                    data = {'gpt_id': 0, 'user_id': user, 'title': get_title['response']}
                    serializer = TitleSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
                        title_id = serializer.instance.title_id
            response = get_ml_response(text)

            if response:
                data = {'gpt_id': 0,'title_id': title_id,'user_message': text, 'gpt_message': response['response']}
                serializer = ChatHistorySerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    chat_id = serializer.instance.chat_id  # Correct way to get the ID
                    return JsonResponse({"success": True, 'data': {'response': response['response'], 'id': chat_id}})
                else:
                    print(serializer.errors)
                    return JsonResponse({"success": True,  'data': {'response': response['response'], 'id': -1}})

            else:
                return JsonResponse({"success": False, 'data': response['response']})
        
class RecSys(APIView):
    def post(self, request, *args, **kwargs):
        response = ''
        if request.method == "POST":
            received_data = request.data
            user = received_data['user']
            text = received_data['text']
            title_id = received_data['title_id']
            # Check
            if title_id == -1:
                get_title = generate_title(text)
                if get_title:
                    print(get_title)
                    data = {'gpt_id': 1, 'user_id': user, 'title': get_title['response']}
                    serializer = TitleSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
                        title_id = serializer.instance.title_id
            response = get_ml_response1(text)

            if response:
                data = {'gpt_id': 1,'title_id': title_id,'user_message': text, 'gpt_message': response['response']}
                serializer = ChatHistorySerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    chat_id = serializer.instance.chat_id  # Correct way to get the ID
                    return JsonResponse({"success": True, 'data': {'response': response['response'], 'id': chat_id}})
                else:
                    print(serializer.errors)
                    return JsonResponse({"success": True,  'data': {'response': response['response'], 'id': -1}})

            else:
                return JsonResponse({"success": False, 'data': response['response']})
        

class vote(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == "POST":
            received_data = request.data
            id = received_data['id']
            vote = received_data['value']
            cursor = connection.cursor()
            cursor.execute(f"CALL vote({id}, {vote});")
            return JsonResponse({"success": True})
        
class loadChat(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == "POST":
            received_data = request.data
            id = received_data['id']
            cursor = connection.cursor()
            cursor.execute(f"CALL load_chat({id});")
            data = dictfetchall(cursor)
            if data:
                print(data)
                return JsonResponse({"success": True, 'data': data})
            return JsonResponse({"success": False, 'data': None})

class getChat(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == "POST":
            user = request.data['user']
            chat = request.data['chat_type']
            cursor = connection.cursor()
            
            # Correct parameterized     
            cursor.execute("CALL get_chat(%s, %s);", [user, chat])
            
            data = dictfetchall(cursor)
            if data:
                print(data)
                return JsonResponse({"success": True, "data": data})
            return JsonResponse({"success": False, "data": None})
