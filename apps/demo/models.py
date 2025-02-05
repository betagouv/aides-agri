from django.db import models
from tree_queries.models import TreeNode
from tree_queries.query import TreeQuerySet


class Question(TreeNode):
    class Meta:
        verbose_name = "Question"
        verbose_name_plural = "Questions"
        unique_together = ("parent", "position")
        ordering = ["position"]

    class Format(models.TextChoices):
        UNIQUE = "UNIQUE", "Choix unique"
        MULTIPLE = "MULTIPLE", "Choix multiples"
        LIBRE = "LIBRE", "Texte libre"

    objects = TreeQuerySet.as_manager(with_tree_fields=True)

    parent = models.ForeignKey(
        "Question", on_delete=models.CASCADE, null=True, blank=True
    )
    parent_choix = models.ForeignKey(
        "Choix",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="question_declencheuse",
    )
    position = models.IntegerField()
    format = models.CharField(choices=Format)
    texte = models.CharField()

    @property
    def is_choix_unique(self):
        return self.format == self.__class__.Format.UNIQUE

    @property
    def is_choix_multiple(self):
        return self.format == self.__class__.Format.MULTIPLE

    @property
    def is_libre(self):
        return self.format == self.__class__.Format.LIBRE

    def __str__(self):
        return self.texte


class Choix(models.Model):
    class Meta:
        verbose_name = "Choix"
        verbose_name_plural = "Choix"

    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    texte = models.CharField()

    def __str__(self):
        return self.texte


class Parcours(models.Model):
    class Meta:
        verbose_name = "Parcours"
        verbose_name_plural = "Parcours"

    session_id = models.CharField()


class Reponse(models.Model):
    class Meta:
        verbose_name = "Réponse"
        verbose_name_plural = "Réponses"

    parcours = models.ForeignKey(Parcours, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    reponse_libre = models.CharField(blank=True)
    choix = models.ForeignKey(Choix, null=True, blank=True, on_delete=models.CASCADE)
    choix_multiples = models.ManyToManyField(
        Choix, blank=True, related_name="reponse_par_choix_multiples"
    )
