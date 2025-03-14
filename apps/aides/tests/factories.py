import factory

from aides import models


class ThemeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Theme

    external_id = factory.Sequence(lambda n: n)
    nom = factory.Sequence(lambda n: f"Thème {n}")


class SujetFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Sujet

    external_id = factory.Sequence(lambda n: n)
    nom = factory.Sequence(lambda n: f"Sujet {n}")


class ZoneGeographiqueFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.ZoneGeographique

    external_id = factory.Sequence(lambda n: n)
    type = models.ZoneGeographique.TYPE_REGION
    nom = factory.Sequence(lambda n: f"Zone Geographique {n}")
    numero = factory.Sequence(lambda n: str(n))
    parent = None
