import logging
from pathlib import Path

import requests
from django.conf import settings
from markdownify import markdownify as md
from pygrister.api import GristApi

from ._grist import AbstractAidesSource, AbstractRawFields
from ._utils import do_request

logger = logging.getLogger(__name__)


class Fields(AbstractRawFields):
    NOM_NORMALISE = "name"
    NOM = "name_initial"
    URL = "url"
    URL_DESCRIPTIF = "origin_url"
    DESCRIPTION = "description"
    PROGRAMMES = "programs"
    CONDITIONS = "eligibility"
    ZONES_GEOGRAPHIQUES = "perimeter"
    COUVERTURE_GEOGRAPHIQUE = "perimeter_scale"
    TYPE_DEPENSE = "destinations"
    URL_DEMARCHE = "application_url"
    TYPES = "aid_types"
    CATEGORIES = "categories"
    PORTEURS = "financers"
    TAUX_MIN = "subvention_rate_lower_bound"
    TAUX_MAX = "subvention_rate_upper_bound"
    TAUX_COMMENTAIRE = "subvention_comment"
    DATE_DEBUT = "predeposit_date"
    DATE_FIN = "submission_deadline"
    AAP_AMI = "is_call_for_project"


class AidesTerritoires(AbstractAidesSource):
    base_url = "https://aides-territoires.beta.gouv.fr"
    token = ""

    mapping_types = {
        "Subvention": "Financement",
        "Autre aide financière": "Financement",
        "Certificat d'économie d'énergie (CEE)": "Financement",
        "Avance récupérable": "Prêt",
        "Prêt": "Prêt",
        "Ingénierie technique": "Étude",
        "Ingénierie financière": "Conseil",
        "Ingénierie Juridique / administrative": "Conseil",
    }

    mapping_categories_sujets = {
        "Culture et identité collective / patrimoine / sports / Arts plastiques et photographie": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Bibliothèques et livres": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Culture et identité collective": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Médias et communication": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Musée": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Patrimoine et monuments historiques": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Spectacle vivant": "Diversification hors agricole",
        "Culture et identité collective / patrimoine / sports / Sports et loisirs": "Diversification hors agricole",
        "Développement économique / production et consommation / Commerces et services": "Diversification hors agricole",
        "Développement économique / production et consommation / Emploi": "Recrutement",
        "Développement économique / production et consommation / Fiscalité des entreprises": "Régime fiscal",
        "Développement économique / production et consommation / Formation professionnelle": "Formation pour salariés",
        "Développement économique / production et consommation / Innovation, créativité et recherche": "Nouvelles pratiques",
        "Développement économique / production et consommation / International": "Exportation",
        "Développement économique / production et consommation / Revitalisation": "Stratégie",
        "Développement économique / production et consommation / Technologies numériques et numérisation": "Formation continue",
        "Développement économique / production et consommation / Tiers-lieux": "Diversification hors agricole",
        "Développement économique / production et consommation / Tourisme": "Diversification hors agricole",
        "Eau et milieux aquatiques / Assainissement des eaux": "Obligations sanitaires",
        "Eau et milieux aquatiques / Cours d'eau / canaux / plans d'eau": "Eau",
        "Eau et milieux aquatiques / Eau pluviale": "Eau",
        "Eau et milieux aquatiques / Eau potable": "Eau",
        "Eau et milieux aquatiques / Eau souterraine": "Eau",
        "Eau et milieux aquatiques / Mers et océans": "Eau",
        "Énergies / Déchets / Economie d'énergie et rénovation énergétique": "Economies énergie",
        "Énergies / Déchets / Recyclage et valorisation des déchets": "Déchets",
        "Énergies / Déchets / Réduction de l'empreinte carbone": "Emissions de carbone",
        "Énergies / Déchets / Réseaux de chaleur": "Economies énergie",
        "Énergies / Déchets / Transition énergétique": "Production d’énergie",
        "Fonctions support / Appui méthodologique": "Formalités d’entreprise",
        "Nature / environnement / Biodiversité": "Investissement agro-écologique",
        "Nature / environnement / Forêts": "Obligations environnementales",
        "Nature / environnement / Milieux humides": "Obligations environnementales",
        "Nature / environnement / Montagne": "Obligations environnementales",
        "Nature / environnement / Qualité de l'air": "Obligations environnementales",
        "Nature / environnement / Risques naturels": "Obligations environnementales",
        "Nature / environnement / Sols": "Obligations environnementales",
        "Nature / environnement / Solutions d'adaptation fondées sur la nature (SafN)": "Investissement agro-écologique",
        "Solidarités / lien social / Handicap": "Handicap",
        "Urbanisme / logement / aménagement / Accessibilité": "Handicap",
        "Urbanisme / logement / aménagement / Foncier": "Agrandissement foncier",
    }

    @classmethod
    def map_types(cls, raw_types: list[str]) -> list[str] | None:
        if not raw_types:
            return None
        return list(set([cls.mapping_types[raw_type] for raw_type in raw_types]))

    @classmethod
    def map_categories_to_sujets(cls, raw_categories: list[str]) -> list[str] | None:
        if not raw_categories:
            return None
        return list(
            set(
                [
                    cls.mapping_categories_sujets[raw_category]
                    for raw_category in raw_categories
                    if raw_category in cls.mapping_categories_sujets
                ]
            )
        )

    def _do_api_call(self, url) -> dict:
        if not self.token:
            r = do_request(
                f"{self.base_url}/api/connexion/",
                method="post",
                headers={"X-AUTH-TOKEN": settings.AIDES_AIDES_TERRITOIRES_API_KEY},
            )
            self.token = r.json().get("token")
        r = do_request(url, headers={"Authorization": f"Bearer {self.token}"})
        r.raise_for_status()
        return r.json()

    def _fetch_aides_from_page(self, url) -> tuple[list[dict], str]:
        aides = []
        d = self._do_api_call(url)
        for hit in d.get("results"):
            aide = dict()
            for field in Fields:
                value = hit.get(field.value)

                if field == Fields.URL:
                    value = f"{self.base_url}{value}"
                elif value and field in (Fields.DESCRIPTION, Fields.CONDITIONS):
                    value = md(value)

                aide[field.name_full] = value
            aides.append(aide)
        return aides, d.get("next")

    def _scrape(self) -> list[dict]:
        aides = []
        url = f"{self.base_url}/api/aids/?organization_type_slugs=farmer"
        while url:
            page_aides, url = self._fetch_aides_from_page(url)
            aides.extend(page_aides)
        return aides

    def _enrich_aide(self, aide: dict) -> None:
        columns = self.grist_integration.__class__.VisibleSolutionsColumns
        aide.update(
            {
                columns.NOM.value: aide[Fields.NOM.name_full],
                columns.URL_DESCRIPTIF.value: aide[Fields.URL_DESCRIPTIF.name_full],
                columns.URL_DEMARCHE.value: aide[Fields.URL_DEMARCHE.name_full],
                columns.PROMESSE.value: aide[Fields.NOM_NORMALISE.name_full],
                columns.DESCRIPTION.value: aide[Fields.DESCRIPTION.name_full],
                columns.ORGANISME.value: self.grist_integration.build_grist_organisme(
                    aide[Fields.PORTEURS.name_full][0]
                )
                if aide[Fields.PORTEURS.name_full]
                else None,
                columns.ORGANISMES_AUTRES.value: self.grist_integration.build_grist_organismes(
                    aide[Fields.PORTEURS.name_full][1:]
                )
                if len(aide[Fields.PORTEURS.name_full]) > 1
                else None,
                columns.PROGRAMMES.value: self.grist_integration.build_grist_programme(
                    aide[Fields.PROGRAMMES.name_full][0]
                )
                if aide[Fields.PROGRAMMES.name_full]
                else None,
                columns.TYPES.value: self.grist_integration.build_grist_types(
                    self.map_types(aide[Fields.TYPES.name_full])
                ),
                columns.MONTANT_TAUX.value: aide[Fields.TAUX_COMMENTAIRE.name_full]
                or "",
                columns.CONDITIONS.value: aide[Fields.CONDITIONS.name_full],
                columns.TYPE_DEPENSE.value: aide[Fields.TYPE_DEPENSE.name_full],
                columns.DATE_OUVERTURE.value: aide[Fields.DATE_DEBUT.name_full],
                columns.DATE_CLOTURE.value: aide[Fields.DATE_FIN.name_full],
                columns.AAP_AMI.value: aide[Fields.AAP_AMI.name_full],
                columns.SUJETS.value: self.grist_integration.build_grist_sujets(
                    self.map_categories_to_sujets(aide[Fields.CATEGORIES.name_full])
                ),
            }
        )
        if aide[Fields.COUVERTURE_GEOGRAPHIQUE.name_full] == "Département":
            aide[columns.COUVERTURE_GEOGRAPHIQUE.value] = "Départemental"
            aide[columns.ZONE_GEOGRAPHIQUE.value] = (
                self.grist_integration.build_grist_departement(
                    aide[Fields.ZONES_GEOGRAPHIQUES.name_full]
                )
            )
        elif aide[Fields.COUVERTURE_GEOGRAPHIQUE.name_full] == "Région":
            aide[columns.COUVERTURE_GEOGRAPHIQUE.value] = "Régional"
            aide[columns.ZONE_GEOGRAPHIQUE.value] = (
                self.grist_integration.build_grist_region(
                    aide[Fields.ZONES_GEOGRAPHIQUES.name_full]
                )
            )
        elif aide[Fields.COUVERTURE_GEOGRAPHIQUE.name_full] == "epci":
            aide[columns.COUVERTURE_GEOGRAPHIQUE.value] = "Local"
            aide[columns.ZONE_GEOGRAPHIQUE.value] = (
                self.grist_integration.build_grist_epci(
                    aide[Fields.ZONES_GEOGRAPHIQUES.name_full]
                )
            )
        elif aide[Fields.COUVERTURE_GEOGRAPHIQUE.name_full] in ("Pays", "Continent"):
            aide[columns.COUVERTURE_GEOGRAPHIQUE.value] = "National"

        if aide[Fields.TAUX_MIN.name_full]:
            aide[columns.MONTANT_TAUX.value] = (
                f"Minimum {aide[Fields.TAUX_MIN.name_full]}%\n"
                + aide[columns.MONTANT_TAUX.value]
            )
        if aide[Fields.TAUX_MAX.name_full]:
            aide[columns.MONTANT_TAUX.value] = (
                f"Maximum {aide[Fields.TAUX_MAX.name_full]}%\n"
                + aide[columns.MONTANT_TAUX.value]
            )

        for field, value in aide.items():
            if isinstance(value, list):
                aide[field] = "\n".join(value)


class OrganismesLogosLoader:
    token = ""

    def __init__(self):
        self.gristapi = GristApi(settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG)

    def _fetch_api_page(self, url) -> tuple[dict[str, str], str | None]:
        r = requests.get(
            url, headers={"Authorization": f"Bearer {self.token}"}, timeout=5
        )
        d = r.json()
        return {
            hit["text"].lower().split("(")[0].strip(): hit["logo"]
            for hit in d.get("results")
            if hit["logo"]
        }, d.get("next")

    def _get_list_of_logos(self) -> dict[str, str]:
        r = requests.post(
            "https://aides-territoires.beta.gouv.fr/api/connexion/",
            headers={"X-AUTH-TOKEN": settings.AIDES_AIDES_TERRITOIRES_API_KEY},
            timeout=5,
        )
        self.token = r.json().get("token")
        url = "https://aides-territoires.beta.gouv.fr/api/backers/?itemsPerPage=100"
        logos = dict()
        while url:
            page_logos, url = self._fetch_api_page(url)
            logos.update(**page_logos)
        return logos

    def load(self, *args, **options):
        # First, fetch all backers from aides-territoires API
        logos_by_nom = self._get_list_of_logos()

        # Then, download each logo and match it to an Organisme from Grist
        organismes_by_nom = {
            o["Nom"].lower().strip(): o["id"]
            for o in self.gristapi.list_records("Ref_Organisme")[1]
        }
        Path("/tmp/logos").mkdir(parents=True, exist_ok=True)
        attachments_ids_by_organisme = dict()
        for logo_nom, logo_url in logos_by_nom.items():
            r = requests.get(logo_url, timeout=5)
            logo_name = logo_url.split("/")[-1]
            logo_filename = f"/tmp/logos/{logo_name}"
            with open(logo_filename, "wb") as fd:
                for chunk in r.iter_content(chunk_size=128):
                    fd.write(chunk)
            if logo_nom in organismes_by_nom:
                try:
                    _, ids = self.gristapi.upload_attachment(logo_filename)
                    attachments_ids_by_organisme[organismes_by_nom[logo_nom]] = ids[0]
                except requests.exceptions.HTTPError:
                    print(f"Erreur lors de l'upload du logo de {logo_nom}")
            else:
                print(f"Pas d'organisme trouvé pour {logo_nom}")

        # Finally, update Organismes in Grist
        self.gristapi.update_records(
            "Ref_Organisme",
            [
                {"id": organisme, "Logo": logo}
                for organisme, logo in attachments_ids_by_organisme.items()
            ],
        )
