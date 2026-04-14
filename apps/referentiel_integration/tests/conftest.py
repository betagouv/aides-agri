import pytest
from pytest_factoryboy import register
from rest_framework.test import APIClient

from referentiel.models import Territoire
from referentiel.tests.factories import (
    OrganismeFactory,
    ProgrammeFactory,
    TerritoireFactory,
)

from .factories import RawDemarcheSchemaDispositifAideFactory


@pytest.fixture
def client_api(admin_user):
    client = APIClient()
    client.force_authenticate(user=admin_user)
    yield client


register(OrganismeFactory, "organisme_fam", nom="FranceAgriMer")
register(ProgrammeFactory, "programme_france_2030", nom="France 2030")
register(
    TerritoireFactory,
    "territoire_reg75",
    type=Territoire.Type.REGION,
    code="75",
    nom="Nouvelle Aquitaine",
)
register(
    TerritoireFactory,
    "territoire_dep13",
    type=Territoire.Type.DEPARTEMENT,
    code="13",
    nom="Bouches-du-Rhône",
)
register(RawDemarcheSchemaDispositifAideFactory)
