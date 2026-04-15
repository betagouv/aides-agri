from django.db.models import Q
from django.http.request import HttpRequest
from django.template.response import TemplateResponse

from aides.models import Aide
from aides_integration.models.base import RawAide


def workflow_view(request: HttpRequest):
    q_filter = Q()
    if parent_id := request.GET.get("parent", None):
        q_filter = q_filter & Q(parent_id=parent_id)

    context = {
        "title": "Workflow d’intégration/édition des aides",
        "raw_todo": RawAide.objects.to_do(),
        "aides_by_status": {
            status.label: Aide.objects.filter(status=status)
            .filter(q_filter)
            .select_related("organisme", "parent")
            .order_by("date_target_publication", "-priority")
            for status in Aide.Status
            if status
            not in (Aide.Status.ARCHIVED, Aide.Status.TODO, Aide.Status.CANDIDATE)
        },
    }

    return TemplateResponse(request, "admin/aides_workflow/workflow.html", context)
