import csv

from .models import Aide


class AideToSchema:
    """
    This class builds a datarow representing an Aide
        for schema https://schema.data.gouv.fr/etalab/schema-dispositif-aide/.

    Current schema version: 0.1.0

    Warnings:
        * The ID is now our internal ID ; neither a UUID as specified in the schema, nor a predictable code as we would like it to be ;
        * Aides Agri doesn't support geographical exclusions for now ;
        * Aides Agri doesn't support proper `porteurs.roles` subfield for now ;
        * This export adds some fields:
            * `etat` that represents the internal status of the Aide object in Aides Agri workflow ;
            * `filieres` that contains Agriculture-specific information ;
            * `parent` that contains the ID of the parent Aide if there is one.

    Notes:
        * Some fields contain an aggregation of several of our Aide model fields.
    """

    fields = [
        "id",
        "parent",
        "titre",
        "promesse",
        "description",
        "eligibilite",
        "types_aides",
        "porteurs",
        "programmes_parents",
        "url_source",
        "cibles",
        "filieres",
        "eligibilite_geographique",
        "eligibilite_geographique_exclusions",
        "date_ouverture",
        "date_cloture",
        "date_mise_a_jour",
        "etat",
    ]

    def __init__(self, aide: Aide):
        self.aide = aide

    @staticmethod
    def _subparagraph(title: str, content) -> str:
        return f"\n\n### {title}\n\n{content}"

    def _prepare_id(self):
        return self.aide.pk

    def _prepare_parent(self):
        return self.aide.parent_id

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
        if self.aide.eligibilite_effectif_min:
            eligibilite += self._subparagraph(
                "Effectif salarié minimal", self.aide.eligibilite_effectif_min
            )
        if self.aide.eligibilite_effectif_max:
            eligibilite += self._subparagraph(
                "Effectif salarié maximal", self.aide.eligibilite_effectif_max
            )
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

    def _prepare_filieres(self):
        return [filiere.nom for filiere in self.aide.filieres.all()]

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

    def _prepare_date_ouverture(self):
        return self.aide.date_debut.isoformat() if self.aide.date_debut else ""

    def _prepare_date_cloture(self):
        return self.aide.date_fin.isoformat() if self.aide.date_fin else ""

    def _prepare_date_mise_a_jour(self):
        return self.aide.date_modified.strftime("%Y-%m-%d %H:%M:%S")

    def _prepare_etat(self):
        return self.aide.get_status_display()

    def build_row(self) -> list:
        return [getattr(self, f"_prepare_{field}")() for field in self.__class__.fields]


def write_aides_as_csv(f, aides_ids: list[int]):
    writer = csv.writer(f)
    writer.writerow(AideToSchema.fields)
    for aide in (
        Aide.objects.filter(pk__in=aides_ids)
        .prefetch_related(
            "types",
            "organismes_secondaires",
            "programmes",
            "zones_geographiques",
            "filieres",
        )
        .select_related("organisme")
    ):
        writer.writerow(AideToSchema(aide).build_row())
    return f
