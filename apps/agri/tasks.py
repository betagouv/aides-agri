from django.core.mail import send_mail
from django.urls import reverse
from procrastinate.contrib.django import app


@app.task
def send_results_by_mail(base_url: str, results_querystring: str, email: str):
    url = f"{base_url}{reverse('agri:results')}{results_querystring}"
    send_mail(
        "Aides Agri : notre recommandation pour votre besoin et profil d'exploitant",
        f"Retrouvez nos recommandations en cliquant sur ce lien : {url}",
        "aides-agri@beta.gouv.fr",
        [email],
    )
