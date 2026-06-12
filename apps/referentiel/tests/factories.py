import factory

from ..models import Organisme, Programme, Territoire


class OrganismeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Organisme

    nom = ""


class ProgrammeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Programme

    nom = ""


class TerritoireFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Territoire

    type = ""
    code = ""
    nom = ""


__all__ = [OrganismeFactory, ProgrammeFactory, TerritoireFactory]
