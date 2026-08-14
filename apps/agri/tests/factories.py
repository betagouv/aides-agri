import factory

from agri import models


class AlerteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Alerte

    email = ""
    departement = None
