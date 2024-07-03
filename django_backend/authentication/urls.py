from django.urls import path
from .views import validate_recaptcha

urlpatterns = [
    path('validate_recaptcha/', validate_recaptcha, name='validate_recaptcha'),
]