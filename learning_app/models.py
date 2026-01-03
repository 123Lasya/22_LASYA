from django.db import models

class UserStory(models.Model):
    concept = models.CharField(max_length=255)
    language = models.CharField(max_length=50)
    story_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)