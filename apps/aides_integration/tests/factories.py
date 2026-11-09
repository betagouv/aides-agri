import factory

from ..models import RawAideFranceAgriMer


class RawAideFranceAgriMerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RawAideFranceAgriMer

    source = ""
    id_externe = factory.Sequence(lambda n: f"id_{n}")
    titre = factory.Sequence(lambda n: f"Raw Aide from FranceAgrimer {n}")
    description = factory.Sequence(lambda n: f"Description {n}")


__all__ = [RawAideFranceAgriMer]
