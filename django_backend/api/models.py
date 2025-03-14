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

class GPTs(models.Model):
    gpt_id = models.AutoField(primary_key=True, auto_created=True)
    gpt = models.TextField()

    def __str__(self):
        return self.gpt
    
    class Meta:
        db_table = 'GPTs'

class Title(models.Model):
    title_id = models.AutoField(primary_key=True, auto_created=True)
    gpt_id = models.ForeignKey(GPTs, db_column="gpt_id", on_delete=models.CASCADE, null=True, blank=True, related_name='title_gpt_ids')
    user_id = models.ForeignKey(UserModel, db_column="username", on_delete=models.CASCADE, default='')
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title_id

    
    class Meta:
        db_table = 'Title'


class ChatHistory(models.Model):
    chat_id = models.AutoField(primary_key=True, auto_created=True)
    gpt_id = models.ForeignKey(GPTs, db_column="gpt_id", on_delete=models.CASCADE, null=True, blank=True, related_name='chat_gpt_ids')
    title_id = models.ForeignKey(Title, db_column="title_id", on_delete=models.CASCADE, null=True, blank=True, related_name='chat_titles')   
    user_message = models.TextField()
    gpt_message = models.TextField()
    vote = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.chat_id)
    
    class Meta:
        db_table = 'ChatHistory'

