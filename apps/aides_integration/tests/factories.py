import factory

from ..models import RawAideFranceAgriMer, RawAideRegionOccitanie


class RawAideFranceAgriMerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RawAideFranceAgriMer

    source = ""
    id_externe = factory.Sequence(lambda n: f"id_{n}")
    titre = factory.Sequence(lambda n: f"Raw Aide from FranceAgrimer {n}")
    description = factory.Sequence(lambda n: f"Description {n}")


class RawAideRegionOccitanieFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RawAideRegionOccitanie

    id_externe = factory.Sequence(lambda n: f"id_{n}")
    titre = factory.Sequence(lambda n: f"Raw Aide from Région Occitanie {n}")
    date_modification = factory.Faker("past_date")
    status = RawAideRegionOccitanie.Status.NEW
    aide = None


__all__ = [RawAideFranceAgriMer, RawAideRegionOccitanieFactory]
