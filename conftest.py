import pytest
from procrastinate.contrib.django import app as django_procrastinate_app
from procrastinate import testing


@pytest.fixture(autouse=True)
def procrastinate_eager():
    with django_procrastinate_app.replace_connector(testing.InMemoryConnector()) as app:
        yield app
