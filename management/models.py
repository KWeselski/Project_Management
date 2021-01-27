from django.conf import settings
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Profile(models.Model):
    SEX_CHOICES = (("male", "Male"), ("female", "Female"))
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    sex = models.CharField(max_length=100, choices=SEX_CHOICES)
    phone = PhoneNumberField(null=True, blank=True)


class Project(models.Model):
    STATUS_CHOICES = (
        ("proposed", "Proposed"),
        ("active", "Active"),
        ("hold", "On Hold"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
        ("archived", "Archived"),
    )
    title = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="proposed")
