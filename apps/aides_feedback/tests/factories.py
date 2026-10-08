import factory

from aides_feedback import models


class FeedbackOnAideFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.FeedbackOnAides

    aide = None
    usefulness = models.FeedbackOnAides.Notes.PARFAIT
