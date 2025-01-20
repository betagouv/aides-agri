from django.db import models
from django.utils.text import slugify

class Topic(models.Model):
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Question(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class PossibleAnswer(models.Model):
    content = models.CharField(max_length=200)
    icon = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='possible_answers')

    def __str__(self):
        return self.content

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.content)
        super().save(*args, **kwargs)