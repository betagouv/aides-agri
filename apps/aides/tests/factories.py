import factory

from aides import models


class OrganismeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Organisme

    nom = factory.Sequence(lambda n: f"Organisme {n}")
    is_masa = False


class ThemeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Theme

    nom = factory.Sequence(lambda n: f"Thème {n}")
    is_prioritaire = False


class SujetFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Sujet
        skip_postgeneration_save = True

    nom = factory.Sequence(lambda n: f"Sujet {n}")

    @factory.post_generation
    def with_themes(obj, create, value: int, **kwargs):
        if not create or not value:
            return
        for i in range(0, value):
            obj.themes.add(ThemeFactory.create())

    @factory.post_generation
    def with_given_theme(obj, create, value: int, **kwargs):
        if not create or not value:
            return
        obj.themes.set([value])


class TypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Type

    nom = factory.Sequence(lambda n: f"Type d'aide {n}")
    description = factory.Faker("sentence")
    score_priorite_aides = 1


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
    organisme = None
    status = models.Aide.Status.TODO
    date_target_publication = None
    url_descriptif = ""
    is_derivable = False
    importance = models.Aide.Importance.BASE
    urgence = models.Aide.Urgence.MEDIUM
    enveloppe_globale = 0
    demande_du_pourvoyeur = False
    taille_cible_potentielle = 0
    is_meconnue = False
    is_filiere_sous_representee = False

    @factory.post_generation
    def with_given_type(obj, create, value, **kwargs):
        if not value or not create:
            return
        obj.types.set([value])

    @factory.post_generation
    def with_given_sujet(obj, create, value, **kwargs):
        if not value or not create:
            return
        obj.sujets.set([value])
