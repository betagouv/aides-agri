import datetime

from django.conf import settings
from django.core.mail import EmailMessage
from django_tasks import task

from .interop import write_aides_as_csv


@task()
def export_aides_to_csv_and_send_by_mail(
    aides_pks: list[int], filters_string: str, email_to: str
):
    filename = f"{datetime.date.today().isoformat()}-aides-agri-aides-{filters_string}"
    with open(f"/tmp/{filename}.csv", "w") as f:
        write_aides_as_csv(f, aides_pks)
    email = EmailMessage(
        f"[Aides Agri {settings.ENVIRONMENT}] Export CSV des aides",
        "Cf PJ",
        settings.DEFAULT_FROM_EMAIL,
        [email_to],
    )
    email.attach_file(f"/tmp/{filename}.csv")
    email.send()
