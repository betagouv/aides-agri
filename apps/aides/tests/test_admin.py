from django.urls import reverse
from django_otp import middleware as django_otp_middleware


def test_aide_admin(admin_client, aide, monkeypatch):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    url = reverse("admin:aides_aide_change", args=[aide.pk])
    res = admin_client.get(url)
    assert res.status_code == 200
