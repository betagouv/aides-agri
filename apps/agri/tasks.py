from django.core.mail import send_mail
from django.http.request import QueryDict
from django.template.loader import render_to_string
from django.urls import reverse
from django_tasks import task
from mjml import mjml2html

from aides.models import Theme, Sujet, Aide, Filiere, ZoneGeographique


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

    querystring_dict = QueryDict(mutable=True)
    querystring_dict.setdefault("departement", departement_code)
    querystring_dict.setlist("themes", themes_ids)
    querystring_dict.setlist("sujets", sujets_ids)
    querystring_dict.setlist("filieres", filieres_ids)

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
                    "departement": departement,
                    "themes": themes,
                    "sujets": sujets,
                    "filieres": filieres,
                    "aides": aides,
                },
            )
        ),
    )
