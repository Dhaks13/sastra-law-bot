from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.db import connection
from .serializers import *

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

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
        cursor.execute(
            f"CALL login_user('{username}', '{password}');")
        data = dictfetchall(cursor)
        if data:
            return JsonResponse({"success": True, 'data': data})
        return JsonResponse({"success": False, 'data': data})
