import datetime

from pytest_factoryboy import register, LazyFixture

from aides.tests import factories  # noqa


register(
    factories.ThemeFactory, "theme_published_urgence", urgence=True, published=True
)
register(factories.ThemeFactory, "theme_published", published=True)
register(factories.ThemeFactory, "theme_unpublished")

register(
    factories.SujetFactory,
    "sujet_urgence_published",
    with_given_theme=LazyFixture("theme_published_urgence"),
    published=True,
)
register(
    factories.SujetFactory,
    "sujet_urgence_unpublished",
    with_given_theme=LazyFixture("theme_published_urgence"),
)
register(
    factories.SujetFactory,
    "sujet_published",
    with_given_theme=LazyFixture("theme_published"),
    published=True,
)
register(
    factories.SujetFactory,
    "sujet_unpublished",
    with_given_theme=LazyFixture("theme_published"),
)

register(factories.TypeFactory, "type_aides_1")
register(factories.TypeFactory, "type_aides_2")
register(factories.TypeFactory, "type_aides_3")

register(factories.FiliereFactory, "filiere_ok_1", published=True)
register(factories.FiliereFactory, "filiere_ok_2", published=True)
register(factories.FiliereFactory, "filiere_published_no_aides", published=True)
register(factories.FiliereFactory, "filiere_unpublished")

register(factories.OrganismeFactory, "organisme_1")
register(factories.OrganismeFactory, "organisme_2")

register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_region_paca",
    type=factories.models.ZoneGeographique.Type.REGION,
    nom="PACA",
)
register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_departement_13",
    type=factories.models.ZoneGeographique.Type.DEPARTEMENT,
    parent=LazyFixture("zone_geographique_region_paca"),
    code="13",
    nom="Bouches-du-Rhône",
)
register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_region_na",
    type=factories.models.ZoneGeographique.Type.REGION,
    nom="Nouvelle Aquitaine",
)
register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_departement_40",
    type=factories.models.ZoneGeographique.Type.DEPARTEMENT,
    parent=LazyFixture("zone_geographique_region_na"),
    code="40",
    nom="Landes",
)

register(factories.BeneficiairesFactory)

date_past = datetime.date.today() + datetime.timedelta(days=-10)
date_soon = datetime.date.today() + datetime.timedelta(days=10)
date_later = datetime.date.today() + datetime.timedelta(days=100)

register(factories.AideFactory)
register(
    factories.PublishedAideFactory,
    "aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ended",
    with_given_type=LazyFixture("type_aides_1"),
    with_given_sujet=LazyFixture("sujet_published"),
    organisme=LazyFixture("organisme_1"),
    date_fin=date_past,
)
register(
    factories.PublishedAideFactory,
    "aide_published_nationale_type_1_sujet_non_urgence_filiere_1_ending_soon",
    with_given_type=LazyFixture("type_aides_1"),
    with_given_filiere=LazyFixture("filiere_ok_1"),
    with_given_sujet=LazyFixture("sujet_published"),
    organisme=LazyFixture("organisme_1"),
    date_fin=date_soon,
)
register(
    factories.PublishedAideFactory,
    "aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ending_later",
    with_given_type=LazyFixture("type_aides_1"),
    with_given_sujet=LazyFixture("sujet_published"),
    organisme=LazyFixture("organisme_1"),
    date_fin=date_later,
)
register(
    factories.PublishedAideFactory,
    "aide_published_nationale_type_1_sujet_non_urgence_no_filiere",
    with_given_type=LazyFixture("type_aides_1"),
    with_given_sujet=LazyFixture("sujet_published"),
    organisme=LazyFixture("organisme_1"),
)
register(
    factories.AideFactory,
    "aide_unpublished_dept_13_type_1_sujet_urgence_filiere_1",
    with_given_type=LazyFixture("type_aides_1"),
    with_given_sujet=LazyFixture("sujet_urgence_published"),
    with_given_filiere=LazyFixture("filiere_ok_1"),
    with_given_zone_geographique=LazyFixture("zone_geographique_departement_13"),
    organisme=LazyFixture("organisme_1"),
)
register(
    factories.PublishedAideFactory,
    "aide_published_dept_13_type_1_sujet_urgence_filiere_1",
    with_given_type=LazyFixture("type_aides_1"),
    with_given_sujet=LazyFixture("sujet_urgence_published"),
    with_given_filiere=LazyFixture("filiere_ok_1"),
    with_given_zone_geographique=LazyFixture("zone_geographique_departement_13"),
    organisme=LazyFixture("organisme_1"),
)
register(
    factories.PublishedAideFactory,
    "aide_published_region_paca_type_2_sujet_non_urgence_filiere_2",
    with_given_type=LazyFixture("type_aides_2"),
    with_given_sujet=LazyFixture("sujet_published"),
    with_given_filiere=LazyFixture("filiere_ok_2"),
    with_given_zone_geographique=LazyFixture("zone_geographique_region_paca"),
    organisme=LazyFixture("organisme_2"),
)
register(
    factories.PublishedAideFactory,
    "aide_published_region_na_type_2_sujet_non_urgence_no_filiere",
    with_given_type=LazyFixture("type_aides_2"),
    with_given_sujet=LazyFixture("sujet_published"),
    with_given_zone_geographique=LazyFixture("zone_geographique_region_na"),
    organisme=LazyFixture("organisme_2"),
)
