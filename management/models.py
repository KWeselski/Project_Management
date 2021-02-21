import uuid
from django.conf import settings
from django.contrib.auth.models import User, AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


SEX_CHOICES = (("male", "Male"), ("female", "Female"))


class Profile(AbstractUser):
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    age = models.IntegerField(default=18, validators=[MinValueValidator(18),
                              MaxValueValidator(80)])
    phone = models.CharField(max_length=9, blank=True)
    description = models.CharField(max_length=300, blank=True)
    avatar = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.username


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
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE,
                                related_name='creator')
    users = models.ManyToManyField(Profile, related_name='users')
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,
                              default="new")

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    comment = models.TextField(max_length=350)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
