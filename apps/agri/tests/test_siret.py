import pytest
import requests

from agri import siret

from .common import (
    fake_siret,
    fake_api_response_one_hit,
    fake_api_response_no_hit,
)


def test_mapping_naf_short():
    # WHEN querying mapping_naf_short from testing data
    mapping = siret.mapping_naf_short

    # THEN it's a dict with 3 entries, each value being a string not exceeding 40 characters
    assert isinstance(mapping, dict)
    assert len(mapping) == 3
    for key, value in mapping.items():
        assert isinstance(value, str)
        assert len(value) <= 40


def test_mapping_naf_complete():
    # WHEN querying mapping_naf_complete from testing data
    mapping = siret.mapping_naf_complete

    # THEN it's a dict with 3 entries,
    # each value being a dict with 3 entries
    # ("short" and "long") having strings as values
    assert isinstance(mapping, dict)
    assert len(mapping) == 3
    for key, value in mapping.items():
        assert isinstance(value, dict)
        assert "short" in value
        assert "long" in value
        assert isinstance(value["short"], str)
        assert isinstance(value["long"], str)
        assert len(value["short"]) <= 40


def test_mapping_naf_short_unique():
    # WHEN querying mapping_naf_short_unique from testing data
    mapping = siret.mapping_naf_short_unique

    # THEN it's a dict with 2 entries, each value not exceeding 40 characters
    assert isinstance(mapping, dict)
    assert len(mapping) == 2
    for key, value in mapping.items():
        assert len(value) <= 40


def test_mapping_naf_complete_unique():
    # WHEN querying mapping_naf_complete_unique from testing data
    mapping = siret.mapping_naf_complete_unique

    # THEN it's a dict with 3 entries,
    # each value being a dict with 2 entries
    # ("short" and "long") having strings as values
    assert isinstance(mapping, dict)
    assert len(mapping) == 2
    for key, value in mapping.items():
        assert isinstance(value, dict)
        assert "short" in value
        assert "long" in value
        assert isinstance(value["short"], str)
        assert isinstance(value["long"], str)
        assert len(value["short"]) <= 40


def test_mapping_tranche_effectif_salarie():
    # WHEN querying mapping_effectif_salarie from testing data
    mapping = siret.mapping_effectif

    # THEN it's a dict with 4 entries, each value being a string
    assert isinstance(mapping, dict)
    assert len(mapping) == 4
    for key, value in mapping.items():
        assert isinstance(value, str)


def test_mapping_tranche_effectif_salarie_by_insee_codes():
    # WHEN querying mapping_effectif_salarie_by_insee_codes from testing data
    mapping = siret.mapping_effectif
    mapping_by_insee_codes = siret.mapping_effectif_by_insee_codes

    # THEN it's a dict with 6 entries, each value being a string and a key of mapping_effectif
    assert isinstance(mapping_by_insee_codes, dict)
    assert len(mapping_by_insee_codes) == 6
    for key, value in mapping_by_insee_codes.items():
        assert isinstance(value, str)
        assert value in mapping


def test_search(requests_mock):
    # GIVEN the official company API returning results for a query
    query = "mon entreprise"
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={query}",
        text=fake_api_response_one_hit,
    )

    # WHEN searching
    hits = siret.search(query)

    # THEN there is 1 result, it's a dict that contains all available data
    assert isinstance(hits[0], dict)
    assert len(hits) == 1
    hit = hits[0]
    assert "siren" in hit
    assert hit["siren"] == "123456789"
    assert "matching_etablissements" in hit
    assert isinstance(hit["matching_etablissements"], list)
    etablissement = hit["matching_etablissements"][0]
    assert isinstance(etablissement, dict)
    assert "siret" in etablissement
    assert etablissement["siret"] == "12345678901234"

    # AND it even contains the `libelle_activite_principale` matching the `activite_principale` code
    assert etablissement["activite_principale"] == "01.11Z"
    assert (
        etablissement["libelle_activite_principale"]
        == "Cult céréale, légumineuse, graine oléag."
    )


def test_search_no_match(requests_mock):
    # GIVEN the official company API returning no results
    query = "mon entreprise"
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={query}",
        text=fake_api_response_no_hit,
    )

    # WHEN searching
    hits = siret.search(query)

    # THEN an empty list is returned
    assert hits == []


def test_search_api_unavailable(requests_mock):
    # GIVEN the official company API does not respond
    query = "mon entreprise"
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={query}",
        exc=requests.exceptions.ConnectTimeout,
    )

    # WHEN searching, THEN a custom Exception is raised
    with pytest.raises(siret.SearchUnavailable):
        siret.search(query)


def test_get(requests_mock):
    # GIVEN the official company API returning results for a query
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={fake_siret}",
        text=fake_api_response_one_hit,
    )

    # WHEN searching
    etablissement = siret.get(fake_siret)

    # THEN a dict is returned with the first result's first matching etablissement data
    assert isinstance(etablissement, dict)
    assert "siret" in etablissement
    assert etablissement["siret"] == "12345678901234"

    # AND it even contains the `libelle_activite_principale` matching the `activite_principale` code
    assert etablissement["activite_principale"] == "01.11Z"
    assert (
        etablissement["libelle_activite_principale"]
        == "Cult céréale, légumineuse, graine oléag."
    )
