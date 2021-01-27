from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Profile(models.Model):
    SEX_CHOICES = (("male", "Male"), ("female", "Female"))
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    sex = models.CharField(max_length=100, choices=SEX_CHOICES)
    phone = PhoneNumberField(null=True, blank=True)

    def __str__(self):
        return self.name
    


class Project(models.Model):
    STATUS_CHOICES = (
        ("new", "New"),
        ("active", "Active"),
        ("hold", "On Hold"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
        ("archived", "Archived"),
    )
    title = models.CharField(max_length=100)
    users = models.ManyToManyField(User)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    comment = models.TextField(max_length=350)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
