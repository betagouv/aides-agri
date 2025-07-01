from collections import defaultdict
from datetime import date
from urllib.parse import urlparse, parse_qs

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from django.urls import reverse

from aides.models import Theme, Sujet, ZoneGeographique, Filiere, GroupementProducteurs
from stats.models import CounterEntry

from ...siret import mapping_effectif


class Command(BaseCommand):
    def handle(self, *args, **options):
        to_create = []

        chosen_themes = defaultdict(int)
        chosen_sujets = defaultdict(int)
        chosen_departements = defaultdict(int)
        chosen_filieres = defaultdict(int)
        chosen_groupements = defaultdict(int)
        chosen_effectifs = defaultdict(int)

        themes_by_id = Theme.objects.in_bulk()
        sujets_by_id = Sujet.objects.in_bulk()
        departements_by_numero = {
            dpt.numero: dpt for dpt in ZoneGeographique.objects.departements()
        }
        filieres_by_id = Filiere.objects.in_bulk()
        groupements_by_id = GroupementProducteurs.objects.in_bulk()

        today = date.today()

        r = requests.post(
            f"https://stats.beta.gouv.fr/index.php?module=API&method=Actions.getPageUrls&idSite={settings.MATOMO_SITE_ID}&period=month&date=last1&format=JSON&force_api_session=1",
            data={"token_auth": settings.AGRI_MATOMO_API_KEY},
            timeout=10,
        )
        r.raise_for_status()
        for result in r.json()[today.strftime("%Y-%m")]:
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
                        name="Parcours :thème sélectionné",
                        date=today,
                        key=themes_by_id[int(theme)].nom_court,
                        count=count,
                    )
                )
            except KeyError:
                print(f"Theme not found:{theme}")

        for sujet, count in dict(chosen_sujets).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours :sujets sélectionnés",
                        date=today,
                        key=sujets_by_id[int(sujet)].nom_court,
                        count=count,
                    )
                )
            except KeyError:
                print(f"Sujet not found: {sujet}")

        for departement, count in dict(chosen_departements).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours :départements des exploitations agricoles",
                        date=today,
                        key=departements_by_numero[departement].nom,
                        count=count,
                    )
                )
            except KeyError:
                print(f"Departement not found: {departement}")

        for filiere, count in dict(chosen_filieres).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours :filières des exploitations agricoles",
                        date=today,
                        key=filieres_by_id[int(filiere)].nom,
                        count=count,
                    )
                )
            except KeyError:
                print(f"Filiere not found: {filiere}")

        for code_effectif, count in dict(chosen_effectifs).items():
            to_create.append(
                CounterEntry(
                    name="Parcours :effectifs des exploitations agricoles",
                    date=today,
                    key=mapping_effectif[code_effectif],
                    count=count,
                )
            )

        for groupement, count in dict(chosen_groupements).items():
            try:
                to_create.append(
                    CounterEntry(
                        name="Parcours :groupements de producteurs des exploitations agricoles",
                        date=today,
                        key=groupements_by_id[int(groupement)].nom,
                        count=count,
                    )
                )
            except KeyError:
                print(f"Groupement not found: {groupement}")

        CounterEntry.objects.bulk_create(to_create)
