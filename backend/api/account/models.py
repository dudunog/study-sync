from django.db import models
from django.utils import timezone

class Schedule(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    visibility = models.CharField(max_length=10, choices=[('public', 'Public'), ('private', 'Private')])
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Activity(models.Model):
    schedule = models.ForeignKey(Schedule, related_name='activities', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    duration = models.IntegerField(help_text="Duration in minutes")
    category = models.CharField(max_length=10, choices=[('class', 'Class'), ('review', 'Review'), ('test', 'Test')])
    priority = models.CharField(max_length=10, choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')])

    def __str__(self):
        return self.name
