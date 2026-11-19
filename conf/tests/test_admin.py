import pytest
from django.contrib.admin import site
from django.http import HttpResponseRedirect
from django.urls import reverse
from django_otp import middleware as django_otp_middleware


@pytest.mark.django_db
def test_admin_2fa_required(admin_client):
    # GIVEN a failed request to access admin site,
    # despite being an authenticated admin client
    res = admin_client.get(reverse("admin:index"))
    assert isinstance(res, HttpResponseRedirect)
    assert res.status_code == 302
    assert res.url.startswith(reverse("admin:login"))

    # WHEN calling admin site login()
    redirect_res = site.login(res.wsgi_request)

    # THEN redirection is made to the 2fa flow
    assert isinstance(redirect_res, HttpResponseRedirect)
    assert redirect_res.url == reverse("two_factor:setup")


@pytest.mark.django_db
def test_admin_index(admin_client, monkeypatch):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # WHEN accessing the admin index page as admin user
    res = admin_client.get(reverse("admin:index"))

    # THEN it works, and it carries some stats
    assert res.status_code == 200
    assert res.context["aides_published"] == 0
    assert res.context["alertes"] == 0
    assert res.context["feedback_on_results_last_month"] == "Pas de notes"


@pytest.mark.django_db
def test_default_admin_url_not_accessible(admin_client):
    """Vérifie que l'URL par défaut 'admin/' n'est pas accessible"""
    response = admin_client.get("/admin/")
    assert response.status_code == 404
