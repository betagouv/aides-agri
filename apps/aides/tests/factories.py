import factory

from aides import models


class OrganismeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Organisme

    nom = factory.Sequence(lambda n: f"Organisme {n}")


class ThemeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Theme

    nom = factory.Sequence(lambda n: f"Thème {n}")


class SujetFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Sujet
        skip_postgeneration_save = True

    nom = factory.Sequence(lambda n: f"Sujet {n}")

    @factory.post_generation
    def with_themes(self, create, extracted: int, **kwargs):
        if not create or not extracted:
            return
        for i in range(0, extracted):
            self.themes.add(ThemeFactory.create())


class TypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Type

    nom = factory.Sequence(lambda n: f"Type d'aide {n}")
    description = factory.Faker("sentence")


class ZoneGeographiqueFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.ZoneGeographique

    type = models.ZoneGeographique.Type.REGION
    nom = factory.Sequence(lambda n: f"Zone Geographique {n}")
    code = factory.Sequence(lambda n: str(n))
    parent = None


class AideFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Aide

    nom = factory.Sequence(lambda n: f"Aide {n}")
