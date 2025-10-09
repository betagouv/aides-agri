from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.urls import reverse
from django_tasks import task

from .models import Aide, Organisme


@task()
def enrich_aide(aide_pk: int, raw_data_mapping: dict[str, str]):
    aide = Aide.objects.get(pk=aide_pk)
    for raw_data_key, field_name in raw_data_mapping.items():
        if field_name == "organisme":
            aide.organisme = Organisme.objects.get(
                nom__iexact=aide.raw_data[raw_data_key]
            )
    aide.save()


@task()
def admin_notify_assignee(aide_pk: int, base_url: str):
    aide = Aide.objects.get(pk=aide_pk)
    url = base_url + reverse("admin:aides_aide_change", args=[aide_pk])
    send_mail(
        "[Aides Agri] Une aide t’a été assignée",
        f"L’aide suivante vient de t’être assignée : {aide.nom} ( {url} )\n\nCommentaire interne : {aide.internal_comments}",
        settings.DEFAULT_FROM_EMAIL,
        [aide.assigned_to.email],
    )


@task()
def admin_notify_new_cc(aide_pk: int, base_url: str, recipients_pks: list[int]):
    aide = Aide.objects.get(pk=aide_pk)
    url = base_url + reverse("admin:aides_aide_change", args=[aide_pk])
    send_mail(
        "[Aides Agri] Tu es désormais en CC d’une aide",
        f"Tu recevras désormais des notifs aux changements d’état de l’aide suivante : {aide.nom} ( {url} )\n\nCommentaire interne : {aide.internal_comments}",
        settings.DEFAULT_FROM_EMAIL,
        [user.email for user in get_user_model().objects.filter(pk__in=recipients_pks)],
    )


@task()
def admin_notify_cc(aide_pk: int, base_url: str):
    aide = Aide.objects.get(pk=aide_pk)
    url = base_url + reverse("admin:aides_aide_change", args=[aide_pk])
    send_mail(
        "[Aides Agri] Une aide vient de changer d’état",
        f"L’aide suivante, dont tu es en CC, vient de passer à l’état {aide.status} : {aide.nom} ( {url} )\n\nCommentaire interne : {aide.internal_comments}",
        settings.DEFAULT_FROM_EMAIL,
        [cc.email for cc in aide.cc_to.all()],
    )
