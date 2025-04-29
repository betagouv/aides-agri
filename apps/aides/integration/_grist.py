import dataclasses
import datetime
import enum
import functools
import itertools
import logging
import typing

from django.conf import settings
from pygrister.api import GristApi

from ..grist import (
    ThemeLoader,
    SujetLoader,
    OrganismeLoader,
    ProgrammeLoader,
    TypeLoader,
    ZoneGeographiqueLoader,
    FiliereLoader,
    GroupementProducteursLoader,
    AideLoader,
)


logger = logging.getLogger(__name__)
gristapi = GristApi(config=settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG)


class GristIntegration:
    def __init__(self):
        _, self.doc_id = gristapi.add_doc(
            f"Intégration {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )

    def replicate_references(self):
        """
        Duplicate the real reference tables we have in the main Grist document
        into a new document dedicated to an integration batch
        """
        grist_loaders = (
            ThemeLoader(),
            SujetLoader(),
            TypeLoader(),
            ZoneGeographiqueLoader(),
            OrganismeLoader(),
            ProgrammeLoader(),
            FiliereLoader(),
            GroupementProducteursLoader(),
        )

        # Then, bulk-add tables with complete schema, except formula columns
        to_add = []
        cols_to_pop = dict()
        for grist_loader in grist_loaders:
            columns = grist_loader.gristapi.list_cols(grist_loader.table)[1]
            cols = [col for col in columns if not col["fields"]["isFormula"]]
            cols_to_pop[grist_loader.table] = [
                col["id"] for col in columns if col["fields"]["isFormula"]
            ]
            to_add.append(
                {
                    "id": grist_loader.table,
                    "columns": cols,
                }
            )
        gristapi.add_tables(to_add, doc_id=self.doc_id)

        # Finally, copy data, once again excluding formula columns
        for grist_loader in grist_loaders:
            _, records = grist_loader.gristapi.list_records(grist_loader.table)
            for record in records:
                record.pop("id")
                for col in cols_to_pop[grist_loader.table]:
                    record.pop(col)
            for batch in itertools.batched(records, n=100):
                gristapi.add_records(
                    grist_loader.table, list(batch), doc_id=self.doc_id
                )

    @functools.cached_property
    def programmes(self) -> dict[str, str]:
        return {
            i["Nom"]: i["id"]
            for i in gristapi.list_records("Ref_Programmes", doc_id=self.doc_id)[1]
        }

    def build_grist_programme(self, nom_programme: str) -> tuple[str, str]:
        return "L", self.programmes[nom_programme]

    @functools.cached_property
    def regions(self) -> dict[str, str]:
        return {
            i["Nom"]: i["id"]
            for i in gristapi.list_records(
                "Ref_Zones_geographiques",
                filter={"Type": ["Région"]},
                doc_id=self.doc_id,
            )[1]
        }

    def build_grist_region(self, nom_region: str) -> tuple[str, str]:
        return "L", self.regions[nom_region]

    @functools.cached_property
    def organismes(self) -> dict[str, str]:
        return {
            i["Nom"]: i["id"]
            for i in gristapi.list_records("Ref_Organismes", doc_id=self.doc_id)[1]
        }

    def build_grist_organisme(self, nom_organisme: str) -> tuple[str, str]:
        return "L", self.organismes[nom_organisme]

    @functools.cached_property
    def types(self) -> dict[str, str]:
        return {
            i["Type_aide"]: i["id"]
            for i in gristapi.list_records("Ref_Types", doc_id=self.doc_id)[1]
        }

    def build_grist_types(self, noms_types: list[str]) -> tuple[str, ...]:
        return tuple(
            ["L"]
            + [self.types.get(nom, None) for nom in noms_types if nom in self.types]
        )

    class VisibleSolutionsColumns(enum.Enum):
        ID = "Id_solution"
        NOM = "nom_aide"
        PROMESSE = "promesse"
        TYPES = "types_aide"
        SUJETS = "thematique_aide"
        ORGANISME = "porteur_aide"
        ORGANISMES_AUTRES = "porteurs_autres"
        PROGRAMMES = "programme_aides"
        DESCRIPTION = "description"
        AUTRES_INFORMATIONS = "autres_informations"
        URL_DESCRIPTIF = "url_descriptif"
        URL_DEMARCHE = "url_demarche"
        CONTACT = "contact"
        MONTANT_TAUX = "taux_subvention_commentaire"
        AAP_AMI = "aap_ami"
        DUREE = "duree_aide"
        EXEMPLE_PROJET = "exemple_projet"
        DATE_OUVERTURE = "date_ouverture"
        DATE_CLOTURE = "date_cloture"
        RECURRENCE = "recurrence_aide"
        CONDITIONS = "condition_eligibilite"
        ETAT_PROJET = "Etat_d_avancement_du_projet_pour_beneficier_du_dispositif"
        ELIGIBILITE_SECTORIELLE_AGE = "Eligibilite_Sectorielle_age"
        ELIGIBILITE_EXISTENCE = "Eligibilite_Existence"
        COUVERTURE_GEOGRAPHIQUE = "Couverture_Geographique"
        ZONE_GEOGRAPHIQUE = "zone_geographique"
        BENEFICIAIRES_AIDE = "beneficiaires_aide"
        FILIERES = "filieres"
        MIN_EFFECTIF = "min_effectif"
        MAX_EFFECTIF = "max_effectif"
        ELIGIBILITE_MICRO_ENTREPRISE = "Eligibilite_micro_entreprise"
        ELIGIBILTE_NAF = "Eligibilte_NAF"
        TYPE_DEPENSE = "type_depense"
        ETAPE_1 = "etape_1"
        ETAPE_2 = "etape_2"
        ETAPE_3 = "etape_3"
        ETAPE_4 = "etape_4"
        ETAPE_5 = "etape_5"
        ETAPE_6 = "etape_6"

    @dataclasses.dataclass
    class GristCol:
        id: str
        fields: dict[str, typing.Any]

        def to_dict(self) -> dict[str, dict[str, typing.Any]]:
            return {
                "id": self.id,
                "fields": self.fields,
            }

    @staticmethod
    def _build_cols(raw_cols: list[str]) -> list[dict]:
        # First, get all columns from real Solutions table
        grist_cols = {
            col["id"]: col["fields"]
            for col in AideLoader().gristapi.list_cols("Solutions")[1]
        }
        # Then, structure them as objects, filter only the visible ones, and order them
        cols = [
            GristIntegration.GristCol(id=col.value, fields=grist_cols[col.value])
            for col in GristIntegration.VisibleSolutionsColumns
        ]
        # Finally, add specific raw columns,
        # if possible as close as possible to their target column
        for raw_col in raw_cols:
            try:
                GristIntegration.VisibleSolutionsColumns(raw_col)
                continue
            except ValueError:
                pass

            grist_raw_col = GristIntegration.GristCol(
                id=raw_col,
                fields={"type": "Text", "label": f"BRUT : {raw_col}"},
            )
            for i, col in enumerate(cols):
                if raw_col == col.id:
                    cols.insert(i, grist_raw_col)
                    break
            else:
                cols.append(grist_raw_col)
        return [col.to_dict() for col in cols]

    def integrate(self, aides_source_class: type["AbstractAidesSource"]):
        to_load = aides_source_class(self).get_aides()

        tablename = f"load-{aides_source_class.__name__}".replace("-", "_").capitalize()

        gristapi.open_session()
        _, tableids = gristapi.add_tables(
            [
                {
                    "id": tablename,
                    "columns": self._build_cols(list(to_load[0].keys())),
                }
            ],
            doc_id=self.doc_id,
        )
        tableid = tableids[0]
        for batch in itertools.batched(to_load, n=20):
            gristapi.add_records(tableid, list(batch), doc_id=self.doc_id)
        gristapi.close_session()


class AbstractAidesSource:
    name = None

    def __init__(self, grist_integration: GristIntegration):
        self.grist_integration = grist_integration

    def get_aides(self) -> list[dict]:
        return []
