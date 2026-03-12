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
    extra_context = {
        "tables_headers": ["Période", "Valeur"],
        "stats": {
            "Utilisable": [
                {
                    "label": "Nombre total d’aides publiées",
                    "data": [
                        ("Décembre 2025", "62"),
                        ("Janvier 2026", "88"),
                        ("Février 2026", "99"),
                    ],
                },
                {
                    "label": "Taux de rebond de la page d’accueil",
                    "data": [
                        ("Décembre 2025", "49 %"),
                        ("Janvier 2026", "45 %"),
                        ("Février 2026", "52 %"),
                    ],
                },
                {
                    "label": "Taux de complétion du parcours usager",
                    "data": [
                        ("Décembre 2025", "37 %"),
                        ("Janvier 2026", "47 %"),
                        ("Février 2026", "48 %"),
                    ],
                },
            ],
            "Utilisé": [
                {
                    "label": "Nombre de visiteurs uniques par mois",
                    "data": [
                        ("Décembre 2025", "1 010"),
                        ("Janvier 2026", "1 700"),
                        ("Février 2026", "1 542"),
                    ],
                },
                {
                    "label": "Temps moyen passé sur le site",
                    "data": [
                        ("Décembre 2025", "2 min 10s"),
                        ("Janvier 2026", "2 min 35s"),
                        ("Février 2026", "1 min 50s"),
                    ],
                },
            ],
            "Utile": [
                {
                    "label": "Nombre de clics vers les descriptifs officiels des aides ou les télédémarches",
                    "data": [
                        ("Décembre 2025", "108"),
                        ("Janvier 2026", "160"),
                        ("Février 2026", "142"),
                    ],
                },
                {
                    "label": "Note moyenne de l’utilité perçue des dispositifs proposés (sur 5)",
                    "data": [
                        ("Janvier 2026", "1,7"),
                        ("Février 2026", "2,02"),
                    ],
                },
                {
                    "label": "Note moyenne de l’utilité perçue des fiches d’aides (sur 5)",
                    "data": [
                        ("Janvier 2026", "2,95"),
                        ("Février 2026", "3,35"),
                    ],
                },
            ],
        },
    }
