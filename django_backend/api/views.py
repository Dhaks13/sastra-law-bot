from django.shortcuts import render
from django.http import JsonResponse
from .models import UserModel

def UserModel_list(request):
    user = UserModel.objects.all().values()
    return JsonResponse(list(user), safe=False)
