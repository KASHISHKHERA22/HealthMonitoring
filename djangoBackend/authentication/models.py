from django.db import models

# Create your models here.


class authUser(models.Model):
    fullName = models.CharField(max_length=12, blank=True)
    email = models.EmailField(default='example@example.com')
    password = models.CharField(max_length=12, default="")
    phone = models.CharField(max_length=10, null=True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10, choices=(
        ('male', 'Male'), ('female', 'Female'), ('other', 'Other')), default='Male')
    role = models.CharField(max_length=12, choices=(
        ('doctor', 'Doctor'), ('patient', 'Patient')), default='patient')

    def __str__(self) -> str:
        return self.email


class appointments(models.Model):
    date = models.DateField()
    time = models.TimeField()
    email = models.EmailField(default='example@example.com')
    hospital = models.CharField(max_length=150,default='hospital')
    bookedAt = models.DateTimeField(auto_now_add=True)
    bookedFor = models.CharField(max_length=20, blank=False, default='Dr')

    def __str__(self):
        return f"Date: {self.date}, Time: {self.time}"


class doctorList(models.Model):
    disease = models.CharField(max_length=20, blank=False)
    doctorName = models.CharField(max_length=20, blank=False)
    email = models.EmailField(default='example@example.com')
    image = models.ImageField(upload_to='docImages',   blank=True, null=True,)
    specialization = models.CharField(max_length=20, blank=False)
    rating = models.IntegerField()

    def __str__(self) -> str:
        return self.doctorName
