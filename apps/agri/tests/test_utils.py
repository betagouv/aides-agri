import pytest

from agri import utils


@pytest.mark.parametrize("code_insee_commune,code_departement", [
    ("13990", "13"),
    ("2A123", "2A"),
    ("97400", "974"),
])
def test_departement_from_commune(code_insee_commune, code_departement):
    assert utils.departement_from_commune(code_insee_commune) == code_departement
