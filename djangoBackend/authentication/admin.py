from django.contrib import admin
from .models import authUser, appointments, doctorList

# Register your models here.
admin.site.register(authUser)
admin.site.register(appointments)
admin.site.register(doctorList)
