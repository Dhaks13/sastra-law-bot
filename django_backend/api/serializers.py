from rest_framework import serializers
from .models import *

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class ChatHistorySerializer(serializers.ModelSerializer):
    user_id = serializers.SlugRelatedField(slug_field="username", queryset=UserModel.objects.all())
    title_id = serializers.PrimaryKeyRelatedField(queryset=Title.objects.all())

    class Meta:
        model = ChatHistory
        fields = '__all__'

class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = '__all__'