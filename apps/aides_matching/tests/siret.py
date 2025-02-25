from aides_matching import siret


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
    # WHEN querying mapping_naf_short from testing data
    mapping = siret.mapping_tranche_effectif_salarie

    # THEN it's a dict with 4 entries, each value being a string
    assert isinstance(mapping, dict)
    assert len(mapping) == 4
    for key, value in mapping.items():
        assert isinstance(value, str)
