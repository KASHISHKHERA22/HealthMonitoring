# Generated by Django 5.0.2 on 2024-02-24 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_rename_user_authuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='authuser',
            name='age',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='authuser',
            name='email',
            field=models.EmailField(default='example@example.com', max_length=254),
        ),
        migrations.AddField(
            model_name='authuser',
            name='fullName',
            field=models.CharField(blank=True, max_length=12),
        ),
        migrations.AddField(
            model_name='authuser',
            name='password',
            field=models.TextField(default='', max_length=12),
        ),
        migrations.AddField(
            model_name='authuser',
            name='phone',
            field=models.CharField(max_length=10, null=True),
        ),
    ]