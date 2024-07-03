from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.db import connection

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
            return JsonResponse({"success": True, 'data': data})

class ValidateEmail(APIView):
    def post(self, request, *args, **kwargs):
        received_data = request.data  # Get JSON data from POST request
        
        # Assuming 'email' is in the received JSON data
        email = received_data.get('email', '')

        cursor = connection.cursor()
        cursor.execute(f"CALL validate_email('{email}');")
        data = dictfetchall(cursor)
        
        # Assuming dictfetchall is a function to convert cursor data to dict
        
        return JsonResponse({"success": True, "data": data})
