# Generated by Django 5.0.2 on 2024-03-28 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0016_alter_doctorlist_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctorlist',
            name='image',
            field=models.ImageField(blank=True, default='profile.jpg', null=True, upload_to='docImages'),
        ),
    ]