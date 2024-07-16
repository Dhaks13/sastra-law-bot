from django.db import models

# Create your models here.

class UserModel(models.Model):
    username = models.CharField(primary_key=True,max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'UserModel'


class ChatModel(models.Model):
    chatid = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserModel, db_column="username", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.chatid
    class Meta:
        db_table = 'ChatModel'

class MessageModel(models.Model):
    messageid = models.AutoField(primary_key=True)
    chat = models.ForeignKey(ChatModel, db_column="chatid", on_delete=models.CASCADE)
    messagetype = models.BooleanField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return self.messageid
    class Meta:
        db_table = 'MessageModel'
