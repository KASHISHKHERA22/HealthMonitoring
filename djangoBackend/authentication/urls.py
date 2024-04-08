from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('signIn', views.signIn, name="signIn"),
    path('signUp', views.signUp, name="signUp"),
    path('logOut', views.logOut, name="logOut"),
    path('live', views.live, name="live"),
    path('prediction', views.prediction, name="prediction"),
    path('predictedDisease', views.diseasePred, name="predictedDisease"),
    path('appointment', views.appointment,  name="appointment"),
    path('bookedAppointment', views.bookedAppointment,  name="bookedAppointment"),
    path('storeDoctor', views.storeDoctor, name="storDoctor"),
    path('hardware', views.hardwareData, name="hardwareData")
]
