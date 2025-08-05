import datetime

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.models import QuerySet, Q
from django.utils.functional import cached_property
from pygrister.api import GristApi

from ...models import (
    Theme,
    Sujet,
    Programme,
    Filiere,
    GroupementProducteurs,
    Type,
    Organisme,
    ZoneGeographique,
    Aide,
)


gristapi = GristApi(settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG)


class Command(BaseCommand):
    ZONES_GEO_TYPES = {
        "Région": ZoneGeographique.Type.REGION.value,
        "Département": ZoneGeographique.Type.DEPARTEMENT.value,
        "Collectivité d'outre-mer": ZoneGeographique.Type.COM.value,
        "Collectivité sui generis": ZoneGeographique.Type.COM.value,
        "Communauté de communes": ZoneGeographique.Type.EPCI.value,
        "Communauté d'Agglo": ZoneGeographique.Type.EPCI.value,
        "Métropole": ZoneGeographique.Type.EPCI.value,
        "Communauté Urbaine": ZoneGeographique.Type.EPCI.value,
        "Commune": ZoneGeographique.Type.COMMUNE.value,
    }

    @cached_property
    def _zones_geo(self) -> dict[int, tuple[str, str]]:
        zones_geo = dict()
        for row in gristapi.list_records("Ref_Zones_geographiques")[1]:
            type_zone_geo = self.__class__.ZONES_GEO_TYPES[row["Type"]]
            second_criteria = (
                "Nom" if type_zone_geo == ZoneGeographique.Type.EPCI.value else "Numero"
            )
            zones_geo[row["id"]] = (type_zone_geo, row[second_criteria])
        return zones_geo

    def _find_zones_geo(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            query = Q(pk__in=[])
            for key, value in self._zones_geo.items():
                if key in ids:
                    if value[0] == ZoneGeographique.Type.EPCI.value:
                        query.add(Q(type=value[0], nom=value[1]), Q.OR)
                    else:
                        query.add(Q(type=value[0], code=value[1]), Q.OR)
            return ZoneGeographique.objects.filter(query)
        except ValueError:
            return ZoneGeographique.objects.none()

    @cached_property
    def _filieres(self) -> dict[int, str]:
        return {
            row["id"]: row["Nom"] for row in gristapi.list_records("Ref_Filieres")[1]
        }

    def _find_filieres(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            return Filiere.objects.filter(
                nom__in=[value for key, value in self._filieres.items() if key in ids]
            )
        except ValueError:
            return Filiere.objects.none()

    @cached_property
    def _types(self) -> dict[int, str]:
        return {
            row["id"]: row["Type_aide"] for row in gristapi.list_records("Ref_Types")[1]
        }

    def _find_types(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            return Type.objects.filter(
                nom__in=[value for key, value in self._types.items() if key in ids]
            )
        except ValueError:
            return Type.objects.none()

    @cached_property
    def _themes(self) -> dict[int, str]:
        return {
            row["id"]: row["Libelle"] for row in gristapi.list_records("Themes_v2")[1]
        }

    def _find_themes(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            return Theme.objects.filter(
                nom__in=[value for key, value in self._themes.items() if key in ids]
            )
        except ValueError:
            return Theme.objects.none()

    @cached_property
    def _sujets(self) -> dict[int, str]:
        return {
            row["id"]: row["Libelle"] for row in gristapi.list_records("Sujets_v2")[1]
        }

    def _find_sujets(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            return Sujet.objects.filter(
                nom__in=[value for key, value in self._sujets.items() if key in ids]
            )
        except ValueError:
            return Sujet.objects.none()

    @cached_property
    def _programmes(self) -> dict[int, str]:
        return {
            row["id"]: row["Nom"] for row in gristapi.list_records("Ref_Programmes")[1]
        }

    def _find_programmes(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            return Programme.objects.filter(
                nom__in=[value for key, value in self._programmes.items() if key in ids]
            )
        except ValueError:
            return Programme.objects.none()

    @cached_property
    def _organismes(self) -> dict[int, str]:
        return {
            row["id"]: row["Nom"] for row in gristapi.list_records("Ref_Organisme")[1]
        }

    def _find_organismes(self, ids: list[str]) -> QuerySet:
        try:
            ids = [int(i) for i in ids]
            return Organisme.objects.filter(
                nom__in=[value for key, value in self._organismes.items() if key in ids]
            )
        except ValueError:
            return Organisme.objects.none()

    def load_themes(self):
        to_create = []
        for row in gristapi.list_records("Themes_v2")[1]:
            to_create.append(
                Theme(
                    nom=row["Libelle"],
                    nom_court=row["Libelle_court"],
                    description=row["Biscuit2"],
                    urgence=row["Urgence"],
                    published=row["A_publier"],
                )
            )
        Theme.objects.bulk_create(to_create)

    def load_sujets(self):
        for row in gristapi.list_records("Sujets_v2")[1]:
            if not row["Themes"]:
                continue
            sujet = Sujet.objects.create(
                nom=row["Libelle"],
                nom_court=row["Libelle_court"],
                published=row["A_publier"],
            )
            sujet.themes.add(*self._find_themes(row["Themes"][1:]))

    def load_filieres(self):
        to_create = []
        for row in gristapi.list_records("Ref_Filieres")[1]:
            to_create.append(
                Filiere(
                    nom=row["Nom"],
                    published=row["A_AFFICHER"],
                    position=row["Ordre"]
                    if row["Ordre"]
                    else Filiere.position.field.default,
                    code_naf=row["NAF"],
                )
            )
        Filiere.objects.bulk_create(to_create)

    def load_programmes(self):
        to_create = []
        for row in gristapi.list_records("Ref_Programmes")[1]:
            to_create.append(Programme(nom=row["Nom"]))
        Programme.objects.bulk_create(to_create)

    def load_groupements_producteurs(self):
        to_create = []
        for row in gristapi.list_records("Ref_Groupements_producteurs")[1]:
            to_create.append(
                GroupementProducteurs(nom=row["Nom"], libelle=row["Mention_longue"])
            )
        GroupementProducteurs.objects.bulk_create(to_create)

    def load_types(self):
        to_create = []
        for row in gristapi.list_records("Ref_Types")[1]:
            to_create.append(
                Type(
                    nom=row["Type_aide"],
                    description=row["Description"],
                    urgence=row["urgence"],
                    icon_name=row["icon_name"],
                )
            )
        Type.objects.bulk_create(to_create)

    def load_organismes(self):
        logos_filenames = {
            attachment["id"]: attachment["fields"]["fileName"]
            for attachment in gristapi.list_attachments()[1]
        }
        for row in gristapi.list_records("Ref_Organisme")[1]:
            obj = Organisme.objects.create(
                nom=row["Nom"],
                acronyme=row["Acronyme"],
                famille=row["Famille"] if row["Famille"] else "",
                secteurs=row["Secteur_d_activite"][1:]
                if row["Secteur_d_activite"]
                else [],
                url=row["Site"] if row["Site"] else "",
                courriel=row["Courriel"] if row["Courriel"] else "",
                logo_filename=row["Logo"][-1] if row["Logo"] else "",
            )
            if obj.logo_filename:
                logo_id = int(obj.logo_filename)
                logo_filename = f"{logo_id}-{logos_filenames[logo_id]}"
                gristapi.download_attachment(f"/tmp/{logo_filename}", logo_id)
                obj.logo_filename = logo_filename
                with open(f"/tmp/{logo_filename}", "rb") as f:
                    obj.logo = f.read()
                obj.save()
            if row["Zones_geographiques"]:
                obj.zones_geographiques.add(
                    *self._find_zones_geo(row["Zones_geographiques"][1:])
                )

    def load_aides(self):
        for row in gristapi.list_records("Solutions")[1]:
            aide = Aide.objects.create(
                nom=row["nom_aide"],
                promesse=row["promesse"],
                description=row["description"],
                exemple_projet=row["exemple_projet"],
                url_descriptif=row["url_descriptif"],
                url_demarche=row["url_demarche"],
                contact=row["contact"],
                organisme=self._find_organismes([row["porteur_aide"]]).first(),
                aap_ami=row["aap_ami"],
                conditions=row["condition_eligibilite"],
                montant=row["taux_subvention_commentaire"],
                participation_agriculteur=row["Participation_de_l_agriculteur"],
                recurrence_aide=row["recurrence_aide"],
                date_debut=datetime.datetime.fromtimestamp(row["date_ouverture"])
                if row["date_ouverture"]
                else None,
                date_fin=datetime.datetime.fromtimestamp(row["date_cloture"])
                if row["date_cloture"]
                else None,
                eligibilite_effectif_min=row["Eligibilite_effectif_minimum"],
                eligibilite_effectif_max=row["Eligibilite_effectif_maximum"],
                eligibilite_etape_avancement_projet=row[
                    "Eligibilite_etat_avancement_projet"
                ],
                eligibilite_age=row["Eligibilite_age"],
                eligibilite_cumulable=row["Eligibilite_cumulable"],
                type_depense=row["type_depense"],
                couverture_geographique=row["Couverture_Geographique"],
                duree_accompagnement=row["duree_aide"],
                etapes=row["Etapes"],
                beneficiaires=row["beneficiaires_aide"][1:]
                if row["beneficiaires_aide"]
                else [],
                status=row["Statut"],
                source=row["Origine_Source_donnee"],
                integration_method=row["Modalite_de_recolte_de_la_donnee"],
                date_created=row["Date_d_ajout"],
                date_modified=row["date_mise_a_jour"],
                raison_desactivation=row["Raison_desactivation"],
                internal_comments=row["Commentaire_INTERNE"],
                raw_data={
                    "porteur_aide": row["porteur_aide"],
                    "porteurs_autres": row["porteurs_autres"],
                    "thematique_aide": row["thematique_aide"],
                    "Eligibilite_activites": row["Eligibilite_activites"],
                    "programme_aides": row["programme_aides"],
                    "types_aide": row["types_aide"],
                    "zone_geographique": row["zone_geographique"],
                    "autres_informations": row["autres_informations"],
                },
            )
            if row["thematique_aide"]:
                aide.sujets.add(*self._find_sujets(row["thematique_aide"][1:]))
            if row["porteurs_autres"]:
                aide.organismes_secondaires.add(
                    *self._find_organismes(row["porteurs_autres"][1:])
                )
            if row["Eligibilite_activites"]:
                aide.filieres.add(
                    *self._find_filieres(row["Eligibilite_activites"][1:])
                )
            if row["programme_aides"]:
                aide.programmes.add(*self._find_programmes(row["programme_aides"][1:]))
            if row["types_aide"]:
                aide.types.add(*self._find_types(row["types_aide"][1:]))
            if row["zone_geographique"]:
                aide.zones_geographiques.add(
                    *self._find_zones_geo(row["zone_geographique"][1:])
                )

    def handle(self, *args, **options):
        self.load_themes()
        self.load_sujets()
        self.load_types()
        self.load_programmes()
        self.load_groupements_producteurs()
        self.load_filieres()
        self.load_organismes()
        self.load_aides()
