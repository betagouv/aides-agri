import pytest
from django.test import override_settings
from django_tasks.base import TaskResultStatus
from django_tasks_db.models import DBTaskResult
from django_tasks.signals import task_finished

from agri.tasks import send_results_by_mail


@pytest.mark.django_db
@override_settings(TASKS={"default": {"BACKEND": "django_tasks_db.DatabaseBackend"}})
def test_obfuscate_send_results_by_mail_pii():
    # GIVEN a DBTaskResult for task send_results_by_mail
    db_task_result = DBTaskResult.objects.create(
        backend_name=send_results_by_mail.get_backend().alias,
        task_path=send_results_by_mail.module_path,
        status=TaskResultStatus.SUCCESSFUL,
        args_kwargs={"args": [], "kwargs": {"email": "name@domain.tld", "a": "bla"}},
    )

    # WHEN tasks is signaled as finished
    task_finished.send(
        sender=db_task_result.task_result.task.get_backend(),
        task_result=db_task_result.task_result,
    )

    # THEN e-mail address has been redacted
    db_task_result.refresh_from_db()
    assert db_task_result.args_kwargs == {
        "args": [],
        "kwargs": {"email": "***REDACTED***", "a": "bla"},
    }


@pytest.mark.django_db
@override_settings(TASKS={"default": {"BACKEND": "django_tasks_db.DatabaseBackend"}})
def test_does_not_obfuscate_send_results_by_mail_pii_when_failed():
    # GIVEN a DBTaskResult for task send_results_by_mail
    db_task_result = DBTaskResult.objects.create(
        backend_name=send_results_by_mail.get_backend().alias,
        task_path=send_results_by_mail.module_path,
        status=TaskResultStatus.FAILED,
        args_kwargs={"args": [], "kwargs": {"email": "name@domain.tld", "a": "bla"}},
    )

    # WHEN tasks is signaled as finished
    task_finished.send(
        sender=db_task_result.task_result.task.get_backend(),
        task_result=db_task_result.task_result,
    )

    # THEN e-mail address has been redacted
    db_task_result.refresh_from_db()
    assert db_task_result.args_kwargs == {
        "args": [],
        "kwargs": {"email": "name@domain.tld", "a": "bla"},
    }
