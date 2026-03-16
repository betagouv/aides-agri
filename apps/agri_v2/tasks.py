from django.core.mail import send_mail
from django.http.request import QueryDict
from django.template.loader import render_to_string
from django.urls import reverse
from django_tasks import task
from mjml import mjml2html

from aides.models import Theme, Sujet, Aide


@task()
def send_results_by_mail(
    email: str,
    base_url: str,
    themes_ids: list[int],
    sujets_ids: list[int],
    aides_ids: list[int],
):
    themes = Theme.objects.filter(pk__in=themes_ids)
    sujets = Sujet.objects.filter(pk__in=sujets_ids)
    aides = Aide.objects.filter(pk__in=aides_ids)

    querystring_dict = QueryDict(mutable=True)
    querystring_dict.update(
        {
            "themes": themes_ids,
            "sujets": sujets_ids,
        }
    )

    url = f"{base_url}{reverse('agri_v2:results')}?{querystring_dict.urlencode()}"

    send_mail(
        "Aides Agri : notre recommandation pour votre besoin et profil d'exploitant",
        f"Retrouvez nos recommandations en cliquant sur ce lien : {url}",
        "Aides Agri <no-reply@aides-agri.beta.gouv.fr>",
        [email],
        html_message=mjml2html(
            render_to_string(
                "agri_v2/mail/results.mjml",
                context={
                    "base_url": base_url,
                    "link": url,
                    "themes": themes,
                    "sujets": sujets,
                    "aides": aides,
                },
            )
        ),
    )
