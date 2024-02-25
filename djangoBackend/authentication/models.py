from django.db import models

# Create your models here.
class authUser(models.Model):
    fullName= models.CharField(max_length = 12, blank= True)
    email= models.EmailField(default='example@example.com')
    password= models.CharField(max_length= 12, default="")
    phone= models.CharField(max_length=10, null = True)
    age= models.IntegerField(null= True)

    def __str__(self) -> str:
        return self.email