from django.contrib import admin
from management.models import Profile, Project, Comment


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["email", "sex", "age", "phone"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "id",
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
