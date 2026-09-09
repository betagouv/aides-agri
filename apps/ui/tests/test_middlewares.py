import pytest

from django.contrib.redirects.models import Redirect


@pytest.mark.django_db
@pytest.mark.parametrize("redirect__old_path,redirect__new_path", [["/coucou", "/"]])
def test_redirect(client, redirect):
    # GIVEN a redirect
    assert Redirect.objects.count() == 1

    # WHEN calling the exact same path with no querystring
    response = client.get(redirect.old_path)

    # THEN redirection happens
    assert response.status_code == 301
    assert response.headers["Location"] == redirect.new_path

    # WHEN calling the exact same path with a random querystring
    response = client.get(redirect.old_path + "?nklsndfklnds")

    # THEN redirection happens
    assert response.status_code == 301
    assert response.headers["Location"] == redirect.new_path
