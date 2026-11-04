import factory

from aides.tests.factories import FiliereFactory, SujetFactory, ThemeFactory
from agri import models


class AboutPageQuoteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.AboutPageQuote


class AlerteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Alerte

    email = ""
    departement = None

    @factory.post_generation
    def override_date_creation(obj, create, value, **kwargs):
        if not create or not value:
            return
        obj.date_creation = value
        obj.save()

    @factory.post_generation
    def with_filieres(obj, create, value: int, **kwargs):
        if not create or not value:
            return
        for i in range(0, value):
            obj.filieres.add(FiliereFactory.create(published=True))

    @factory.post_generation
    def with_sujets(obj, create, value: int, **kwargs):
        if not create or not value:
            return
        for i in range(0, value):
            obj.sujets.add(SujetFactory.create())

    @factory.post_generation
    def with_themes(obj, create, value: int, **kwargs):
        if not create or not value:
            return
        for i in range(0, value):
            obj.themes.add(ThemeFactory.create())
