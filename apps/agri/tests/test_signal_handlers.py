import pytest
from django.test import override_settings
from django_tasks.base import TaskResultStatus
from django_tasks_db.models import DBTaskResult
from django_tasks.signals import task_finished

from agri.tasks import register_email_into_brevo_crm


@pytest.mark.django_db
@override_settings(TASKS={"default": {"BACKEND": "django_tasks_db.DatabaseBackend"}})
def test_obfuscate_tasks_pii():
    # GIVEN a DBTaskResult for task register_email_into_brevo_crm
    db_task_result = DBTaskResult.objects.create(
        backend_name=register_email_into_brevo_crm.get_backend().alias,
        task_path=register_email_into_brevo_crm.module_path,
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
def test_does_not_obfuscate_tasks_pii_when_failed():
    # GIVEN a DBTaskResult for task register_email_into_brevo_crm
    db_task_result = DBTaskResult.objects.create(
        backend_name=register_email_into_brevo_crm.get_backend().alias,
        task_path=register_email_into_brevo_crm.module_path,
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
