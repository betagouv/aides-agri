from agri import siret


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
