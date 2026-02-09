from django.dispatch import receiver
from django_tasks.backends.base import BaseTaskBackend, TaskResult as BaseTaskResult
from django_tasks_db.backend import DatabaseBackend
from django_tasks import TaskResultStatus
from django_tasks.signals import task_finished

from ..tasks import send_results_by_mail


@receiver(task_finished)
def obfuscate_send_results_by_mail_pii(
    sender: type[BaseTaskBackend], task_result: BaseTaskResult, **kwargs: dict
) -> None:
    if not all(
        (
            isinstance(sender, DatabaseBackend),
            hasattr(task_result, "db_result"),
            task_result.task == send_results_by_mail,
            task_result.status == TaskResultStatus.SUCCESSFUL,
        )
    ):
        return
    task_result.db_result.args_kwargs["kwargs"]["email"] = "***REDACTED***"
    task_result.db_result.save()
