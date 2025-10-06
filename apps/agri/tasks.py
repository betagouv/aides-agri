from datetime import date

from django.core.mail import send_mail
from django.http.request import QueryDict
from django.template.loader import render_to_string
from django.urls import reverse
from django_tasks import task
from mjml import mjml2html

from aides.models import (
    Theme,
    Sujet,
    ZoneGeographique,
    Aide,
    Filiere,
    GroupementProducteurs,
)


@task()
def send_results_by_mail(
    email: str,
    base_url: str,
    theme_id: int,
    sujets_ids: list[int],
    commune_id: int,
    date_installation: str,
    effectif: tuple[str, str],
    filieres_ids: list[int],
    groupements_ids: list[int],
    aides_ids: list[int],
    etablissement: dict[str, str] = None,
):
    theme = Theme.objects.get(pk=theme_id)
    sujets = Sujet.objects.filter(pk__in=sujets_ids)
    commune = ZoneGeographique.objects.get(pk=commune_id)
    filieres = Filiere.objects.filter(pk__in=filieres_ids)
    groupements = GroupementProducteurs.objects.filter(pk__in=groupements_ids)
    aides = Aide.objects.filter(pk__in=aides_ids)

    querystring_dict = QueryDict(mutable=True)
    querystring_dict.update(
        {
            "theme": theme.pk,
            "commune": commune.code,
            "date_installation": date_installation,
            "tranche_effectif_salarie": effectif[0],
        }
    )
    if etablissement:
        querystring_dict.update({"siret": etablissement["siret"]})
    querystring_dict.setlist("sujets", [s.pk for s in sujets])
    querystring_dict.setlist("filieres", [f.pk for f in filieres])
    querystring_dict.setlist("regroupements", [g.pk for g in groupements])

    url = f"{base_url}{reverse('agri:results')}?{querystring_dict.urlencode()}"

    send_mail(
        "Aides Agri : notre recommandation pour votre besoin et profil d'exploitant",
        f"Retrouvez nos recommandations en cliquant sur ce lien : {url}",
        "Aides Agri <no-reply@aides-agri.beta.gouv.fr>",
        [email],
        html_message=mjml2html(
            render_to_string(
                "agri/mail/results.mjml",
                context={
                    "base_url": base_url,
                    "link": url,
                    "theme": theme,
                    "sujets": sujets,
                    "etablissement": etablissement,
                    "commune": commune,
                    "date_installation": date.fromisoformat(date_installation),
                    "effectif": effectif[1],
                    "filieres": filieres,
                    "groupements": groupements,
                    "aides": aides,
                },
            )
        ),
    )
