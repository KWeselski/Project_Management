from django.contrib import admin

from .models import Profile, Project, Comment

# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "surname", "sex", "phone"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "creator",
        "description",
        "start_date",
        "end_date",
        "status",
    ]
    filter_horizontal = ("users",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["user", "project", "comment"]
