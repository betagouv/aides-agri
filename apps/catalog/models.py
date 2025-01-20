from django.db import models
from django.utils.text import slugify

# Annuaires divers
class Region(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class PublicBody(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()
    def __str__(self):
        return self.name

class IncentiveType(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


# Aides et projets
class Project(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField()
    further_description = models.TextField()
    linked_projects = models.ManyToManyField(
        'self',
        symmetrical=False,
        blank=True,
        related_name='related_to',
    )
    topics = models.ManyToManyField('questionnaire.Topic', related_name='projects')

    class Status(models.TextChoices):
        DRAFT = 'draft', 'Brouillon'
        PUBLISHED = 'published', 'Publié'
        ARCHIVED = 'archived', 'Archivé'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Incentive(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    pitch = models.CharField(max_length=300)
    description = models.TextField()
    short_description = models.TextField()
    primary_operator = models.ForeignKey(PublicBody, on_delete=models.SET_NULL, related_name='primary_operator', null=True)
    secondary_operator = models.ForeignKey(PublicBody, on_delete=models.SET_NULL, related_name='secondary_operator', null=True)
    external_url = models.URLField()
    #TODO : Conditions d'éligibilité

    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    incentive_type = models.ForeignKey(
        IncentiveType,
        on_delete=models.CASCADE,
        related_name='incentives',
    )
    projects = models.ManyToManyField(Project, related_name='incentives')
    topics = models.ManyToManyField('questionnaire.Topic', related_name='incentives')

    class Status(models.TextChoices):
        DRAFT = 'draft', 'Brouillon'
        PUBLISHED = 'published', 'Publié'
        ARCHIVED = 'archived', 'Archivé'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class IncentiveSteps(models.Model):
    content = models.CharField(max_length=100)
    step = models.IntegerField()
    incentive = models.ForeignKey(
        Incentive,
        on_delete=models.CASCADE,
        related_name='steps',
    )
    def __str__(self):
        return self.content