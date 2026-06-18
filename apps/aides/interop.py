import copy
import csv
from functools import cached_property

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from .models import Aide, Organisme


class AideToSchema:
    """
    This class builds a datarow representing an Aide
        for schema https://schema.data.gouv.fr/etalab/dispositif-aide-professionnels/.

    Current schema version: 0.2.0

    Warnings:
        * The ID is now our internal ID ; neither a UUID as specified in the schema, nor a predictable code as we would like it to be ;
        * Aides Agri doesn't support geographical exclusions for now ;
        * Aides Agri doesn't support proper `porteurs.roles` subfield for now ;

    Notes:
        * Some fields contain an aggregation of several of our Aide model fields.
    """

    fields = [
        "id",
        "titre",
        "promesse",
        "description",
        "eligibilite",
        "types_aides",
        "porteurs",
        "programmes_parents",
        "url_source",
        "cibles",
        "eligibilite_geographique",
        "eligibilite_geographique_exclusions",
        "date_ouverture",
        "date_cloture",
        "date_mise_a_jour",
        "base_juridique",
        "eligibilite_effectif_minimal",
        "eligibilite_effectif_maximal",
        "eligibilite_categorie_taille_entreprise",
        "eligibilite_annees_existence_minimal",
        "eligibilite_forme_juridique",
        "eligibilite_forme_juridique_exclusions",
        "ciblage_secteur_activite",
        "ciblage_naf",
        "ciblage_naf_exclusions",
        "chainage_paiement",
    ]

    def __init_subclass__(cls, added_fields: dict[int, str], **kwargs):
        super().__init_subclass__(**kwargs)
        cls.fields = copy.copy(cls.fields)
        for idx, field in added_fields.items():
            cls.fields.insert(idx, field)

    def __init__(self, aide: Aide):
        self.aide = aide

    @staticmethod
    def _subparagraph(title: str, content) -> str:
        return f"\n\n### {title}\n\n{content}"

    def _prepare_id(self):
        return self.aide.pk

    def _prepare_titre(self):
        return self.aide.nom

    def _prepare_promesse(self):
        return self.aide.promesse

    def _prepare_description(self):
        description = ""
        if self.aide.parent:
            description += self.aide.parent.description_de_base
        description += self.aide.description
        if self.aide.montant:
            description += self._subparagraph(
                "Montant ou taux de l’aide", self.aide.montant
            )
        if self.aide.participation_agriculteur:
            description += self._subparagraph(
                "Participation ou coût pour les bénéficiaires",
                self.aide.participation_agriculteur,
            )
        if self.aide.exemple_projet:
            description += self._subparagraph(
                "Exemple de projet ou d’application", self.aide.exemple_projet
            )
        if self.aide.etapes:
            description += self._subparagraph("Étapes", self.aide.etapes)
        return description

    def _prepare_eligibilite(self):
        eligibilite = self.aide.conditions
        if self.aide.type_depense:
            eligibilite += self._subparagraph(
                "Dépenses éligibles", self.aide.type_depense
            )
        if self.aide.eligibilite_cumulable:
            eligibilite += self._subparagraph(
                "Cette aide est-elle cumulable avec d’autres dispositifs ?",
                self.aide.eligibilite_cumulable,
            )
        return eligibilite

    def _prepare_types_aides(self):
        return "|".join([type_aide.nom for type_aide in self.aide.types.all()])

    def _prepare_porteurs(self):
        porteurs = []
        if self.aide.organisme:
            porteurs.append({"nom": self.aide.organisme.nom, "role": "diffuseur"})
        porteurs.extend(
            [
                {"nom": organisme.nom, "role": "autre"}
                for organisme in self.aide.organismes_secondaires.all()
            ]
        )
        return porteurs

    def _prepare_programmes_parents(self):
        return "|".join([programme.nom for programme in self.aide.programmes.all()])

    def _prepare_url_source(self):
        return self.aide.url_descriptif

    def _prepare_cibles(self):
        return "professionnels"

    def _prepare_eligibilite_geographique(self):
        return (
            "PAYS-99100"
            if self.aide.is_national
            else "|".join(
                [
                    zone_geographique.cog
                    for zone_geographique in self.aide.zones_geographiques.all()
                ]
            )
        )

    def _prepare_eligibilite_geographique_exclusions(self):
        return ""

    def _prepare_base_juridique(self):
        return [
            {"libelle": base_juridique.libelle, "lien": base_juridique.url}
            for base_juridique in self.aide.base_juridique.all()
        ]

    def _prepare_eligibilite_effectif_minimal(self):
        return self.aide.eligibilite_effectif_min

    def _prepare_eligibilite_effectif_maximal(self):
        return self.aide.eligibilite_effectif_max

    def _prepare_eligibilite_categorie_taille_entreprise(self):
        return ""

    def _prepare_eligibilite_annees_existence_minimal(self):
        return ""

    def _prepare_eligibilite_forme_juridique(self):
        return ""

    def _prepare_eligibilite_forme_juridique_exclusions(self):
        return ""

    def _prepare_ciblage_secteur_activite(self):
        return ""

    def _prepare_ciblage_naf(self):
        return ""

    def _prepare_ciblage_naf_exclusions(self):
        return ""

    def _prepare_chainage_paiement(self):
        return ""

    def _prepare_date_ouverture(self):
        return self.aide.date_debut.isoformat() if self.aide.date_debut else ""

    def _prepare_date_cloture(self):
        return self.aide.date_fin.isoformat() if self.aide.date_fin else ""

    def _prepare_date_mise_a_jour(self):
        return self.aide.date_modified.strftime("%Y-%m-%d %H:%M:%S")

    def build_row(self) -> list:
        return [getattr(self, f"_prepare_{field}")() for field in self.__class__.fields]


class AideToExternalSchema(
    AideToSchema,
    added_fields={
        4: "montant",
        5: "participation_agriculteur",
        6: "exemple_projet",
        7: "etapes",
        9: "type_depense",
        10: "cumulable",
    },
):
    def _prepare_description(self):
        return self.aide.description

    def _prepare_eligibilite(self):
        return self.aide.conditions

    def _prepare_montant(self):
        return self.aide.montant

    def _prepare_participation_agriculteur(self):
        return self.aide.participation_agriculteur

    def _prepare_exemple_projet(self):
        return self.aide.exemple_projet

    def _prepare_etapes(self):
        return self.aide.etapes

    def _prepare_type_depense(self):
        return self.aide.type_depense

    def _prepare_cumulable(self):
        return self.aide.eligibilite_cumulable


class AideToInternalSchema(
    AideToSchema,
    added_fields={
        1: "parent",
        8: "porteur_principal_sous_famille",
        12: "filieres",
        13: "sujets",
        16: "est_une_declinaison_territoriale",
        32: "etat",
        33: "est_publiee",
        34: "raison_desactivation",
        35: "url_site",
        36: "url_bureau_valideur",
        37: "url_bo",
    },
):
    @cached_property
    def base_url(self):
        return settings.HTTP_SCHEME + get_current_site(None).domain

    def _prepare_parent(self):
        return self.aide.parent_id

    def _prepare_porteur_principal_sous_famille(self):
        organisme = self.aide.organisme
        if not organisme:
            return ""
        sous_famille = organisme.sous_famille
        if not sous_famille:
            if organisme.famille == Organisme.Famille.INTERPROFESSIONS:
                sous_famille = "Interprofession"
            elif organisme.famille in (
                Organisme.Famille.OPERATEUR,
                Organisme.Famille.CHAMBRE_CONSULAIRE,
            ):
                if (
                    organisme.acronyme == "CDC"
                    or organisme.nom == "Banque des territoires"
                ):
                    sous_famille = "CDC/Banque des Territoires"
                else:
                    sous_famille = organisme.acronyme or organisme.nom
            elif organisme.famille == Organisme.Famille.UE:
                sous_famille = "UE"
        return sous_famille

    def _prepare_est_une_declinaison_territoriale(self):
        return "OUI" if self.aide.is_declinaison_territoriale else "NON"

    def _prepare_filieres(self):
        return "|".join([filiere.nom for filiere in self.aide.filieres.all()])

    def _prepare_sujets(self):
        return "|".join([sujet.nom_court for sujet in self.aide.sujets.all()])

    def _prepare_etat(self):
        return self.aide.get_status_display()

    def _prepare_est_publiee(self):
        return "OUI" if self.aide.is_published else "NON"

    def _prepare_raison_desactivation(self):
        return self.aide.get_raison_desactivation_display()

    def _prepare_url_site(self):
        return self.base_url + self.aide.get_absolute_url()

    def _prepare_url_bureau_valideur(self):
        return self.base_url + reverse(
            "aides:aide-sneak-peek", args=[self.aide.pk, self.aide.sneak_peek_token]
        )

    def _prepare_url_bo(self):
        return self.base_url + reverse("admin:aides_aide_change", args=[self.aide.pk])


def write_aides_as_csv(f, schema_class: type[AideToSchema], aides_ids: list[int]):
    writer = csv.writer(f)
    writer.writerow(schema_class.fields)
    for aide in (
        Aide.objects.filter(pk__in=aides_ids)
        .prefetch_related(
            "types",
            "organismes_secondaires",
            "programmes",
            "zones_geographiques",
            "filieres",
            "sujets",
        )
        .select_related("organisme", "parent")
    ):
        writer.writerow(schema_class(aide).build_row())
