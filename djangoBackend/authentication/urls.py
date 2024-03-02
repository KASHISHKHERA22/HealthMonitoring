from django.urls import path, include
from . import views

urlpatterns = [
    path('signIn', views.signIn, name="signIn"),
    path('signUp', views.signUp, name="signUp"),
    path('prediction', views.prediction, name="prediction"),
    path('predictedDisease', views.diseasePred, name="predictedDisease"),
    path('appointment', views.appointment,  name="appointment"),
    path('bookedAppointment', views.bookedAppointment,  name="bookedAppointment"),
    path('storeDoctor', views.storeDoctor, name="storDoctor")
]
