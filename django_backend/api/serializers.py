from rest_framework import serializers
from .models import *

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username', 'email', 'password', 'created_at', 'is_active']

class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ['gpt_id', 'user_message', 'gpt_message','created_at', 'is_active']