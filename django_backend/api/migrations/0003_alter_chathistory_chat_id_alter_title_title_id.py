# Generated by Django 5.1.3 on 2025-03-07 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_title_chathistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chathistory',
            name='chat_id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='title',
            name='title_id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]
