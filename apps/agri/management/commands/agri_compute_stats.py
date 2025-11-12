from collections import defaultdict
from datetime import date, timedelta
from urllib.parse import urlparse, parse_qs

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from django.urls import reverse

from aides.models import Theme, Sujet, ZoneGeographique, Filiere, GroupementProducteurs
from stats.models import CounterEntry

from ...siret import mapping_effectif


class Command(BaseCommand):
    def _get_matomo_api_url(self, method: str):
        return f"https://stats.beta.gouv.fr/index.php?module=API&method={method}&idSite={settings.MATOMO_SITE_ID}&period=week&date=last1&format=JSON&force_api_session=1"

    def _get_last_week_interval(self) -> str:
        return f"{self.last_monday.strftime('%Y-%m-%d')},{self.next_sunday.strftime('%Y-%m-%d')}"

    def compute_page_views_stats(self):
        to_create = []

        chosen_themes = defaultdict(int)
        chosen_sujets = defaultdict(int)
        chosen_departements = defaultdict(int)
        chosen_filieres = defaultdict(int)
        chosen_groupements = defaultdict(int)
        chosen_effectifs = defaultdict(int)

        themes_by_id = Theme.objects.in_bulk()
        sujets_by_id = Sujet.objects.in_bulk()
        departements_by_code = {
            dpt.code: dpt for dpt in ZoneGeographique.objects.departements()
        }
        filieres_by_id = Filiere.objects.in_bulk()
        groupements_by_id = GroupementProducteurs.objects.in_bulk()

        r = requests.post(
            self._get_matomo_api_url("Actions.getPageUrls"),
            data={"token_auth": settings.AGRI_MATOMO_API_KEY},
            timeout=60,
        )
        r.raise_for_status()
        for result in r.json()[self._get_last_week_interval()]:
            if "url" not in result:
                continue
            parsed_url = urlparse(result["url"])
            qs = parse_qs(parsed_url.query)

            if parsed_url.path == reverse("agri:step-2"):
                if "theme" not in qs:
                    continue
                for theme in qs["theme"]:
                    chosen_themes[theme] += result["nb_hits"]
            elif parsed_url.path == reverse("agri:step-3"):
                if "sujets" not in qs:
                    continue
                for sujet in qs["sujets"]:
                    chosen_sujets[sujet] += result["nb_hits"]
            elif parsed_url.path == reverse("agri:step-5"):
                if "commune" not in qs:
                    continue
                for commune in qs["commune"]:
                    chosen_departements[commune[:2]] += result["nb_hits"]
            elif parsed_url.path == reverse("agri:results"):
                if "filieres" not in qs:
                    continue
                for filiere in qs["filieres"]:
                    chosen_filieres[filiere] += result["nb_hits"]
                for effectif in qs["tranche_effectif_salarie"]:
                    chosen_effectifs[effectif] += result["nb_hits"]
                for groupement in qs.get("regroupements", []):
                    chosen_groupements[groupement] += result["nb_hits"]

        for theme, count in dict(chosen_themes).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours : thème sélectionné",
                        date=self.next_sunday,
                        key=themes_by_id[int(theme)].nom_court,
                        count=count,
                    )
                )
            except (KeyError, ValueError):
                print(f"Theme not found:{theme}")

        for sujet, count in dict(chosen_sujets).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours : sujets sélectionnés",
                        date=self.next_sunday,
                        key=sujets_by_id[int(sujet)].nom_court,
                        count=count,
                    )
                )
            except (KeyError, ValueError):
                print(f"Sujet not found: {sujet}")

        for departement, count in dict(chosen_departements).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours : départements des exploitations agricoles",
                        date=self.next_sunday,
                        key=departements_by_code[departement].nom,
                        count=count,
                    )
                )
            except (KeyError, ValueError):
                print(f"Departement not found: {departement}")

        for filiere, count in dict(chosen_filieres).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours : filières des exploitations agricoles",
                        date=self.next_sunday,
                        key=filieres_by_id[int(filiere)].nom,
                        count=count,
                    )
                )
            except (KeyError, ValueError):
                print(f"Filiere not found: {filiere}")

        for code_effectif, count in dict(chosen_effectifs).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours : effectifs des exploitations agricoles",
                        date=self.next_sunday,
                        key=mapping_effectif[code_effectif],
                        count=count,
                    )
                )
            except (KeyError, ValueError):
                print(f"Code effectif not found: {code_effectif}")

        for groupement, count in dict(chosen_groupements).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours : groupements de producteurs des exploitations agricoles",
                        date=self.next_sunday,
                        key=groupements_by_id[int(groupement)].nom,
                        count=count,
                    )
                )
            except (KeyError, ValueError):
                print(f"Groupement not found: {groupement}")

        CounterEntry.objects.bulk_create(to_create)

    def compute_events_stats(self):
        r = requests.post(
            self._get_matomo_api_url("Events.getAction"),
            data={"token_auth": settings.AGRI_MATOMO_API_KEY},
            timeout=60,
        )
        r.raise_for_status()
        to_create = []
        for result in r.json()[self._get_last_week_interval()]:
            to_create.append(
                CounterEntry(
                    name="Parcours : clics",
                    date=self.next_sunday,
                    key=result["label"],
                    count=result["nb_events"],
                )
            )
        CounterEntry.objects.bulk_create(to_create)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.for_date = date.today()
        self.last_monday = self.for_date - timedelta(days=self.for_date.weekday())
        self.next_sunday = self.last_monday + timedelta(days=6)

    def handle(self, *args, **options):
        self.compute_page_views_stats()
        self.compute_events_stats()
