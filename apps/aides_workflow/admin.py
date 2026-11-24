import reversion
from admin_extra_buttons.api import ExtraButtonsMixin, button, confirm_action
from django.contrib import admin
from django.contrib import messages
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from django.db import transaction
from django.http.request import HttpRequest
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils.safestring import SafeString
from django.utils.timezone import localtime

from aides.models import Aide

from .models import Anomaly


@admin.register(Anomaly)
class AnomalyAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    list_display = (
        "__str__",
        "status",
        "date_first_detected",
        "occurrences_count",
        "date_last_detected",
    )
    list_display_links = ("__str__",)
    list_filter = ("status",)
    readonly_fields = (
        "aide",
        "faulty_url_field",
        "http_status_code",
        "date_first_detected",
        "date_last_detected",
        "occurrences_count",
        "interpretation",
        "faulty_url",
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description="Interprétation")
    def interpretation(self, obj: Anomaly):
        match obj.http_status_code:
            case 0:
                return "Le site était injoignable par notre sonde de vérification. Cela signifie la plupart du temps que le site a mis en place une protection anti robots."
            case 503 | 502 | 500:
                return "Le site semblait temporairement en erreur au passage de notre sonde."
            case 403 | 401:
                return "Le site a répondu, mais a refusé l’accès pour cette page à notre sonde. Cela peut signifier que le site a mis en place une protection anti robots, mais cela peut aussi signifier que l’aide a été temporairement dépubliée."
            case 404 | 410:
                return "Le site a répondu, mais la page n’a pas pu être trouvée. Peut signifier que l’aide a été dépubliée."
            case _:
                return "Le site a répondu, mais la page n’a pas pu être vérifiée pour une raison inconnue."

    @button(
        label="⤵️ Dépublier l’aide",
        visible=lambda widget: widget.context["original"].is_open,
    )
    def unpublish_aide(self, request: HttpRequest, pk: int):
        obj: Anomaly = self.get_object(request, pk)
        aide = obj.aide

        def _action(request: HttpRequest) -> None:
            with transaction.atomic():
                with reversion.create_revision():
                    aide.is_published = False
                    aide.status = Aide.Status.ARCHIVED
                    aide.internal_comments += f"\n\n{localtime().strftime('%d/%m/%Y %Hh%M')} : dépublication pour cause d’anomalie"
                    aide.save()
                    reversion.set_user(request.user)
                    reversion.set_comment(
                        "Dépublication, archivage, et ajout d’une précision dans les commentaires internes."
                    )
                obj.status = Anomaly.Status.RESOLVED
                obj.save()

        return confirm_action(
            self,
            request,
            _action,
            template="admin/aides_workflow/confirm.html",
            title="Dépublication d’une aide pour cause d’anomalie sur ses liens",
            message=f"Dépublier l’aide « {aide} » ?",
            success_message="Aide dépubliée et anomalie marquée comme résolue.",
        )

    @button(
        label="⤴️ Changer l’URL concernée dans l’aide",
        visible=lambda widget: widget.context["original"].is_open,
    )
    def change_url_in_aide(self, request: HttpRequest, pk: int):
        if request.method == "POST":
            new_url = request.POST.get("new_url")
            with transaction.atomic():
                obj: Anomaly = self.get_object(request, pk)
                aide = obj.aide
                with reversion.create_revision():
                    setattr(aide, obj.faulty_url_field, new_url)
                    aide.internal_comments += f"\n\n{localtime().strftime('%d/%m/%Y %Hh%M')} : changement de l’URL comme traitement d’une anomalie"
                    aide.save()
                    reversion.set_user(request.user)
                    reversion.set_comment(
                        f"Changement du champ {obj.faulty_url_field}, ajout d’un commentaire interne."
                    )
                obj.status = Anomaly.Status.RESOLVED
                obj.save()
                self.message_user(
                    request,
                    "Aide modifiée et anomalie marquée comme résolue.",
                    level=messages.SUCCESS,
                )
                opts = self.model._meta
                return HttpResponseRedirect(
                    reverse(admin_urlname(opts, SafeString("changelist")))
                )
        else:
            context = self.get_common_context(request, pk)
            return render(
                request, "admin/aides_workflow/change_aide_url.html", context=context
            )

    @button(
        label="❎ Marquer comme faux positif",
        visible=lambda widget: widget.context["original"].is_open,
    )
    def mark_known(self, request: HttpRequest, pk: int):
        obj: Anomaly = self.get_object(request, pk)

        def _action(request: HttpRequest):
            obj.status = Anomaly.Status.KNOWN
            obj.save()

        return confirm_action(
            self,
            request,
            _action,
            template="admin/aides_workflow/confirm.html",
            title="Marquage de cette anomalie comme faux positif",
            message=f"Marquer l’anomalie « {obj} » comme faux positif ?",
            success_message="Anomalie marquée comme faux positif.",
        )
