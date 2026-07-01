import datetime
from pathlib import Path

from django.views.generic import TemplateView


class StaticPageView(TemplateView):
    template_name = "product/static_page.html"
    title = ""
    content_filename = ""

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        with open(Path(__file__).parent / f"content/{self.content_filename}.md") as f:
            content = f.read()
        context_data.update({"title": self.title, "content": content})
        return context_data


class StatistiquesPageView(TemplateView):
    template_name = "product/statistiques.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        all_dates = [
            datetime.date(2025, 12, 1),
            datetime.date(2026, 1, 1),
            datetime.date(2026, 2, 1),
            datetime.date(2026, 3, 1),
            datetime.date(2026, 4, 1),
            datetime.date(2026, 5, 1),
            datetime.date(2026, 6, 1),
        ]
        all_months_codes = [month_date.strftime("%m/%Y") for month_date in all_dates]
        context_data.update(
            {
                "date_updated": datetime.date(2026, 5, 29),
                "stats": {
                    "Le produit Aides Agri est-il utilisable ?": [
                        {
                            "label": "Nombre total d’aides en ligne",
                            "help_text": "C’est le nombre d’aides visibles sur le site Aides Agri à la fin de chaque mois."
                            " Ce chiffre compte comme un seul dispositif les aides pilotées au niveau national mais déclinées au niveau local"
                            " (par exemple, par les Directions Départementales du Territoire).",
                            "source": "Interne",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": [all_months_codes],
                                "y": [[62, 88, 99, 110, 135, 195, 290]],
                                "name": ["Nombre", "Mois"],
                            },
                        },
                        {
                            "label": "Taux de rebond de la page d’accueil",
                            "help_text": "C’est la proportion de visiteurs qui ne voient que la page d’accueil du site,"
                            " ce qui un indicateur du manque d’intérêt."
                            " Cet indicateur doit être le plus faible possible.",
                            "source": "Mesure d’audience fournie par la DINUM",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": [all_months_codes],
                                "y": [[49, 45, 57, 62, 45, 41, 34]],
                                "name": ["Pourcentage", "Mois"],
                            },
                            "unit": "%",
                        },
                    ],
                    "Le produit Aides Agri est-il utilisé ?": [
                        {
                            "label": "Nombre de visiteurs uniques",
                            "help_text": "C’est le nombre de visites reçues par le site dans des contextes de navigation web différents"
                            " (par exemple, pas le même navigateur ou pas le même appareil)."
                            " Cet indicateur permet d’estimer le nombre de personnes différentes ayant visité le site.",
                            "source": "Mesure d’audience fournie par la DINUM",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": [all_months_codes],
                                "y": [[1010, 1700, 1542, 1336, 1135, 6226, 8451]],
                                "name": ["Nombre", "Mois"],
                            },
                        },
                        {
                            "label": "Temps moyen passé sur le site (en secondes)",
                            "help_text": "C’est la durée moyenne d’une visite sur le site, comprenant la navigation de page en page."
                            " Ce chiffre augmente à chaque passage de page en page ;"
                            " le temps passé sur la dernière page visité n’est donc pas comptabilisé.",
                            "source": "Mesure d’audience fournie par la DINUM",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": [all_months_codes],
                                "y": [[130, 155, 110, 119, 96, 168, 183]],
                                "name": ["Secondes", "Mois"],
                            },
                            "unit": "secondes",
                        },
                    ],
                    "Le produit Aides Agri est-il utile ?": [
                        {
                            "label": "Nombre de clics vers les descriptifs officiels des aides ou les télédémarches",
                            "help_text": "C’est l’indicateur principal d’utilité de la plateforme Aides Agri,"
                            " qui est pensée comme un service de découverte de dispositifs et d’aiguillage.",
                            "source": "Mesure d’audience fournie par la DINUM",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": [all_months_codes],
                                "y": [[108, 160, 142, 252, 143, 6374, 8119]],
                                "name": ["Nombre", "Mois"],
                            },
                        },
                        {
                            "label": "Note moyenne (sur 5) de l’utilité perçue des dispositifs listés",
                            "help_text": "Les usagères et usagers qui le souhaitent peuvent noter (de 0 à 5) la pertinence des résultats de recherche listés par Aides Agri."
                            " Cet indicateur présente la moyenne des notes attribuées,"
                            " ainsi que le nombre de notes attribuées.",
                            "source": "Interne (formulaire en bas de la page de résultats)",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": all_months_codes[1:],
                                "y_bar": [1.7, 2.02, 3.75, 0, 2.54, 2.1],
                                "y_line": [25, 12, 3, 0, 27, 25],
                                "name_bar": "Note moyenne (sur 5)",
                                "name_line": "Nombre de notes",
                            },
                        },
                        {
                            "label": "Note moyenne (sur 5) de l’utilité perçue des fiches d’aides",
                            "help_text": "Les usagères et usagers qui le souhaitent peuvent noter (de 0 à 5)"
                            "la clarté et l’utilité des fiches de dispositifs d’aides présentées sur Aides Agri."
                            " Cet indicateur présente la moyenne des notes attribuées,"
                            " ainsi que le nombre de notes attribuées.",
                            "source": "Interne (formulaire en bas des fiches d’aides)",
                            "latest_month": all_dates[-1],
                            "data": {
                                "x": all_months_codes[1:],
                                "y_bar": [2.95, 3.35, 3.125, 0, 2.87, 1.99],
                                "y_line": [13, 13, 10, 2, 47, 54],
                                "name_bar": "Note moyenne (sur 5)",
                                "name_line": "Nombre de notes",
                            },
                        },
                    ],
                },
            }
        )
        return context_data
