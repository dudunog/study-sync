from django.urls import path
from . import views

urlpatterns = [
    path('schedule', views.schedules),
    path('schedules/<int:pk>', views.schedule_detail),
]
