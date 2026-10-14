from django.dispatch import receiver
from django_tasks.backends.base import BaseTaskBackend, TaskResult as BaseTaskResult
from django_tasks_db.backend import DatabaseBackend
from django_tasks import TaskResultStatus
from django_tasks.signals import task_finished

from ..tasks import send_results_by_mail, register_email_into_brevo_crm


@receiver(task_finished)
def obfuscate_tasks_pii(
    sender: type[BaseTaskBackend], task_result: BaseTaskResult, **kwargs: dict
) -> None:
    if not all(
        (
            isinstance(sender, DatabaseBackend),
            hasattr(task_result, "db_result"),
            task_result.task in (send_results_by_mail, register_email_into_brevo_crm),
            task_result.status == TaskResultStatus.SUCCESSFUL,
        )
    ):
        return
    task_result.db_result.args_kwargs["kwargs"]["email"] = "***REDACTED***"
    task_result.db_result.save()
