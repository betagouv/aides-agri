from collections import defaultdict

from django.conf import settings
from django.views.generic import DetailView, TemplateView
from pygrister.api import GristApi

from product.forms import UserNoteForm

from .grist import SujetLoader, TypeLoader, ZoneGeographiqueLoader, AideLoader
from .models import Aide


class AideDetailView(DetailView):
    model = Aide

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        breadcrumb_links = []
        if "HTTP_REFERER" in self.request.META:
            breadcrumb_links.append(
                {
                    "url": self.request.META["HTTP_REFERER"],
                    "title": "Notre recommandation",
                }
            )

        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#aide",
                        "label": "Descriptif de l'aide",
                    },
                ],
                "user_note_form": UserNoteForm(),
                "breadcrumb_data": {
                    "links": breadcrumb_links,
                    "current": self.object.nom,
                },
                "badge_data": {
                    "extra_classes": "fr-badge--green-emeraude",
                    "label": "En cours",
                }
                if self.object.is_ongoing
                else {
                    "extra_classes": "fr-badge--pink-tuile",
                    "label": "Clôturé",
                },
            }
        )
        return context_data


class GristAidesBySujetsTypesAndDepartementView(TemplateView):
    template_name = "aides/prio_edito.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        gristapi = GristApi(config=settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG)
        sujets = {
            record["id"]: record["Libelle_court"]
            for record in gristapi.list_records(SujetLoader.table)[1]
            if record["Libelle_court"]
        }
        sujets[9999] = "Pas de sujet"
        types_aides = {
            record["id"]: record["Type_aide"]
            for record in gristapi.list_records(TypeLoader.table)[1]
            if record["Type_aide"]
        }
        types_aides[9999] = "Pas de type"
        departements = {
            record["id"]: record["Nom"]
            for record in gristapi.list_records(
                ZoneGeographiqueLoader.table,
                filter={"Type": ["Département"], "Numero": ["29", "63"]},
            )[1]
        }
        departements[9999] = "National"
        ids_departements = departements.keys()
        aides = gristapi.list_records(AideLoader.table)[1]
        aides_by_sujet_and_type_and_departement = dict()
        for id_sujet in sujets:
            aides_by_sujet_and_type_and_departement[id_sujet] = dict()
            for id_type in types_aides:
                aides_by_sujet_and_type_and_departement[id_sujet][id_type] = dict()
                for id_departement in ids_departements:
                    aides_by_sujet_and_type_and_departement[id_sujet][id_type][
                        id_departement
                    ] = []

        aides_count = 0
        valid_aides_count = 0
        aides_count_by_status = defaultdict(int)
        for aide in aides:
            if aide["Couverture_Geographique"] != "National" and (
                not aide["Departements"]
                or not any(
                    (
                        int(id_departement) in aide["Departements"]
                        for id_departement in ids_departements
                    )
                )
            ):
                continue

            aides_count += 1
            if aide["Valide"]:
                valid_aides_count += 1
            aides_count_by_status[aide["Statut"]] += 1
            if not aide["thematique_aide"]:
                aide["thematique_aide"] = ["L", 9999]
            if not aide["types_aide"]:
                aide["types_aide"] = ["L", 9999]
            if aide["Couverture_Geographique"] == "National":
                aide["Departements"] = ["L", 9999]
            for sujet in aide["thematique_aide"][1:]:
                for type_aide in aide["types_aide"][1:]:
                    for id_departement in ids_departements:
                        if id_departement in aide["Departements"]:
                            aides_by_sujet_and_type_and_departement[sujet][type_aide][
                                id_departement
                            ].append(
                                aide["Id_solution"]
                                + " (Valide "
                                + ("✅" if aide["Valide"] else "❌")
                                + f", Statut : {aide['Statut']})"
                            )

        context_data.update(
            {
                "sujets": sujets,
                "types": types_aides,
                "departements": departements,
                "aides": aides_by_sujet_and_type_and_departement,
                "aides_count": aides_count,
                "valid_aides_count": valid_aides_count,
                "aides_count_by_status": sorted(
                    [(k, v) for k, v in aides_count_by_status.items()]
                ),
            }
        )

        return context_data
