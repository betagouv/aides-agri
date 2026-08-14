import factory

from agri import models


class AboutPageQuoteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.AboutPageQuote


class AlerteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Alerte

    email = ""
    departement = None
