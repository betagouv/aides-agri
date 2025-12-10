import pytest
from django.contrib.admin import site
from django.http import HttpResponseRedirect
from django.urls import reverse


@pytest.mark.django_db
def test_admin_2fa_required(admin_client):
    # GIVEN a failed request to access admin site,
    # despite being an anthenticated admin client
    res = admin_client.get(reverse("admin:index"))
    assert isinstance(res, HttpResponseRedirect)
    assert res.status_code == 302
    assert res.url.startswith(reverse("admin:login"))

    # WHEN calling admin site login()
    redirect_res = site.login(res.wsgi_request)

    # THEN redirection is made to the 2fa flow
    assert isinstance(redirect_res, HttpResponseRedirect)
    assert redirect_res.url == reverse("two_factor:setup")
