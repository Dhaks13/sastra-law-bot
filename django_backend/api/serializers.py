from rest_framework import serializers
from .models import *

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class GPTsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPTs
        fields = '__all__'

class TitleSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=UserModel.objects.all())
    class Meta:
        model = Title
        fields = '__all__'

class ChatHistorySerializer(serializers.ModelSerializer):
    title_id = serializers.PrimaryKeyRelatedField(queryset=Title.objects.all())  # Use PK for title

    class Meta:
        model = ChatHistory
        fields = '__all__'
