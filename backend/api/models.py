from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=100)