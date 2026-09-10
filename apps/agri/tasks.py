import datetime
import logging

from django.core.mail import send_mail
from django.http.request import QueryDict
from django.template.loader import render_to_string
from django.urls import reverse
from django_tasks import task
from mjml import mjml2html

from agri.models import Alerte
from aides.models import Theme, Sujet, Aide, Filiere, ZoneGeographique


logger = logging.getLogger(__name__)


def _build_results_url(
    base_url: str,
    departement_code: str,
    filieres_ids: list[str],
    themes_ids: list[str],
    sujets_ids: list[str],
) -> str:
    querystring_dict = QueryDict(mutable=True)
    querystring_dict.setdefault("departement", departement_code)
    querystring_dict.setlist("filieres", filieres_ids)
    querystring_dict.setlist("themes", themes_ids)
    querystring_dict.setlist("sujets", sujets_ids)
    return f"{base_url}{reverse('agri:results')}?{querystring_dict.urlencode()}"


@task()
def send_results_by_mail(
    email: str,
    base_url: str,
    departement_code: str,
    themes_ids: list[str],
    sujets_ids: list[str],
    filieres_ids: list[str],
    aides_ids: list[int],
):
    themes = Theme.objects.filter(pk__in=themes_ids)
    sujets = Sujet.objects.filter(pk__in=sujets_ids)
    filieres = Filiere.objects.filter(pk__in=filieres_ids)
    departement = None
    if departement_code:
        departement = ZoneGeographique.objects.departements().get(code=departement_code)
    aides = Aide.objects.filter(pk__in=aides_ids)
    url = _build_results_url(
        base_url, departement_code, filieres_ids, themes_ids, sujets_ids
    )

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
                    "departement": departement,
                    "themes": themes,
                    "sujets": sujets,
                    "filieres": filieres,
                    "aides": aides,
                },
            )
        ),
    )


@task()
def maybe_send_daily_alerte(alerte_id: int, timedelta_seconds: int, base_url: str):
    alerte = Alerte.objects.get(pk=alerte_id)
    aides = Aide.objects.published().filter(
        first_published_at__gte=(
            datetime.datetime.now(datetime.UTC)
            - datetime.timedelta(seconds=timedelta_seconds)
        )
    )
    if alerte.departement:
        aides = aides.by_departements([alerte.departement])
    if alerte.filieres.exists():
        aides = aides.by_filieres(alerte.filieres.all())
    if alerte.themes.exists() or alerte.sujets.exists():
        aides = aides.by_besoins(themes=alerte.themes.all(), sujets=alerte.sujets.all())

    if not aides.exists():
        print(f"No Aide for Alerte {alerte_id}")
        return

    url = _build_results_url(
        base_url,
        alerte.departement.code if alerte.departement else None,
        list(alerte.filieres.values_list("pk", flat=True)),
        list(alerte.themes.values_list("pk", flat=True)),
        list(alerte.sujets.values_list("pk", flat=True)),
    )
    url_alertes = reverse("agri:alerte-list", kwargs={"token": alerte.token})

    send_mail(
        "Aides Agri : de nouvelles aides correspondent à votre recherche",
        f"Retrouvez cette recherche en cliquant sur ce lien : {url}",
        "Aides Agri <no-reply@aides-agri.beta.gouv.fr>",
        [alerte.email],
        html_message=mjml2html(
            render_to_string(
                "agri/mail/alerte.mjml",
                context={
                    "base_url": base_url,
                    "link": url,
                    "url_alertes": f"{base_url}{url_alertes}",
                    "departement": alerte.departement,
                    "filieres": alerte.filieres.all(),
                    "themes": alerte.themes.all(),
                    "sujets": alerte.sujets.all(),
                    "aides": aides,
                },
            )
        ),
    )
