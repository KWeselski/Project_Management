from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


# Create your models here.
class Profile(models.Model):
    SEX_CHOICES = (("male", "Male"), ("female", "Female"))
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    sex = models.CharField(max_length=100, choices=SEX_CHOICES)
    age = models.IntegerField(default=18, validators=[MinValueValidator(18),
                              MaxValueValidator(80)])
    phone = models.CharField(max_length=9)
    description = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.firstname


class Project(models.Model):
    STATUS_CHOICES = (
        ("new", "New"),
        ("active", "Active"),
        ("onhold", "On Hold"),
        ("completed", "Completed"),
        ('delayed', "Delayed")
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=100)
    creator = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='creator')
    users = models.ManyToManyField(User, related_name='users')
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,
                              default="new")

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    comment = models.TextField(max_length=350)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
