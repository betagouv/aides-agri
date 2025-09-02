from django.contrib.admin import site
from django.contrib.auth import get_user_model
from django.urls import reverse
from django_otp import middleware as django_otp_middleware

from admin_concurrency.admin import ConcurrentModelAdmin


class ConcurrentUserAdmin(ConcurrentModelAdmin):
    pass


site.unregister(get_user_model())
site.register(get_user_model(), ConcurrentUserAdmin)


def test_concurrent_model_admin(
    admin_client, admin_client2, admin_user, admin_user2, monkeypatch
):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN:
    # - 2 admin clients for 2 separate admin users
    # - A ConcurrentModelAdmin registered for User model

    urlchange = reverse("admin:auth_user_change", args=[admin_user.pk])
    urlchange2 = reverse("admin:auth_user_change", args=[admin_user2.pk])
    urllist = reverse("admin:auth_user_concurrencylist", args=[admin_user.pk])
    urlread = reverse("admin:auth_user_concurrencyread", args=[admin_user.pk])
    urlwrite = reverse("admin:auth_user_concurrencywrite", args=[admin_user.pk])
    urlrelease = reverse("admin:auth_user_concurrencyrelease", args=[admin_user.pk])

    # WHEN an admin goes on a change form
    res = admin_client.get(urlchange)
    assert res.status_code == 200
    assert res.context_data["has_change_permission"]

    # THEN the other admin is allowed to see the editable change form
    res = admin_client2.get(urlchange)
    assert res.status_code == 200
    assert res.context_data["has_change_permission"]

    # WHEN the first admin registers as reader
    res = admin_client.post(urlread)
    assert res.status_code == 200

    # THEN the other admin sees the first admin as reader
    res = admin_client2.get(urllist)
    assert res.status_code == 200
    assert res.context["reads"].count() == 1

    # WHEN the first admin registers as writer
    res = admin_client.post(urlwrite)
    assert res.status_code == 200

    # THEN:
    # - The second admin can see the same change page, but as not editable
    res = admin_client2.get(urlchange)
    assert res.status_code == 200
    assert not res.context_data["has_change_permission"]
    # - The second admin sees the first admin as writer
    res = admin_client2.get(urllist)
    assert res.status_code == 200
    assert res.context["write"] is not None
    # - The second admin can see the change page of another object as editable
    res = admin_client2.get(urlchange2)
    assert res.status_code == 200
    assert res.context_data["has_change_permission"]

    # WHEN the first admin releases the change form
    res = admin_client.post(urlrelease)
    assert res.status_code == 200

    # THEN the second admin is allowed to see the change form as editable
    res = admin_client2.get(urlchange)
    assert res.status_code == 200
    assert res.context_data["has_change_permission"]
