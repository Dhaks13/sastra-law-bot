# Generated by Django 5.1.3 on 2025-03-07 02:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Title',
            fields=[
                ('title_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'Title',
            },
        ),
        migrations.CreateModel(
            name='ChatHistory',
            fields=[
                ('chat_id', models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False)),
                ('gpt_id', models.IntegerField()),
                ('user_message', models.TextField()),
                ('gpt_message', models.TextField()),
                ('vote', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('user_id', models.ForeignKey(db_column='username', default='', on_delete=django.db.models.deletion.CASCADE, to='api.usermodel')),
                ('title_id', models.ForeignKey(db_column='title_id', default=0, on_delete=django.db.models.deletion.CASCADE, to='api.title')),
            ],
            options={
                'db_table': 'ChatHistory',
            },
        ),
    ]
