import csv
import io
import json
import tempfile

import pytest
from pytest_factoryboy import LazyFixture

from aides.interop import (
    write_aides_as_csv,
    AideToSchema,
    AideToExternalSchema,
    AideToExternalSchemaForHumans,
)


@pytest.mark.django_db
@pytest.mark.parametrize(
    "aide__organisme,aide__organisme_instructeur",
    [[LazyFixture("organisme"), LazyFixture("organisme_2")]],
)
def test_write_aides_as_csv(aide, organisme, organisme_2):
    with io.StringIO("") as f:
        write_aides_as_csv(f, AideToSchema, [aide.pk])
        f.flush()
        f.seek(0)
        for i, row in enumerate(csv.reader(f)):
            if i == 0:
                assert row == [
                    "id",
                    "titre",
                    "promesse",
                    "description",
                    "eligibilite",
                    "types_aides",
                    "porteurs",
                    "programmes_parents",
                    "url_source",
                    "cibles",
                    "eligibilite_geographique",
                    "eligibilite_geographique_exclusions",
                    "date_ouverture",
                    "date_cloture",
                    "date_mise_a_jour",
                    "base_juridique",
                    "eligibilite_effectif_minimal",
                    "eligibilite_effectif_maximal",
                    "eligibilite_categorie_taille_entreprise",
                    "eligibilite_annees_existence_minimal",
                    "eligibilite_forme_juridique",
                    "eligibilite_forme_juridique_exclusions",
                    "ciblage_secteur_activite",
                    "ciblage_naf",
                    "ciblage_naf_exclusions",
                    "chainage_paiement",
                ]
            elif i == 1:
                assert len(row) == 26
                assert row[0] == str(aide.pk)
                assert json.loads(row[6]) == [
                    {"nom": organisme.nom, "role": "diffuseur"},
                    {"nom": organisme_2.nom, "role": "instructeur"},
                ]
            else:
                assert False


@pytest.mark.django_db
def test_write_aides_as_csv_with_external_schema(aide):
    with io.StringIO("") as f:
        write_aides_as_csv(f, AideToExternalSchema, [aide.pk])
        f.flush()
        f.seek(0)
        for i, row in enumerate(csv.reader(f)):
            if i == 0:
                assert row == [
                    "id",
                    "titre",
                    "promesse",
                    "description",
                    "montant",
                    "participation_agriculteur",
                    "exemple_projet",
                    "etapes",
                    "eligibilite",
                    "type_depense",
                    "types_aides",
                    "porteurs",
                    "programmes_parents",
                    "url_source",
                    "cibles",
                    "eligibilite_geographique",
                    "eligibilite_geographique_exclusions",
                    "date_ouverture",
                    "date_cloture",
                    "date_mise_a_jour",
                    "base_juridique",
                    "eligibilite_effectif_minimal",
                    "eligibilite_effectif_maximal",
                    "eligibilite_categorie_taille_entreprise",
                    "eligibilite_annees_existence_minimal",
                    "eligibilite_forme_juridique",
                    "eligibilite_forme_juridique_exclusions",
                    "ciblage_secteur_activite",
                    "ciblage_naf",
                    "ciblage_naf_exclusions",
                    "chainage_paiement",
                ]
            elif i == 1:
                assert len(row) == 31
                assert row[0] == str(aide.pk)
            else:
                assert False


@pytest.mark.django_db
def test_write_aides_as_csv_with_humans_schema(aide_published):
    aide = aide_published
    with io.StringIO("") as f:
        write_aides_as_csv(f, AideToExternalSchemaForHumans, [aide.pk])
        f.flush()
        f.seek(0)
        for i, row in enumerate(csv.reader(f)):
            if i == 0:
                assert row == [
                    "id",
                    "titre",
                    "promesse",
                    "description",
                    "montant",
                    "participation_agriculteur",
                    "exemple_projet",
                    "etapes",
                    "eligibilite",
                    "type_depense",
                    "types_aides",
                    "porteurs",
                    "programmes_parents",
                    "url_source",
                    "cibles",
                    "eligibilite_geographique",
                    "eligibilite_geographique_exclusions",
                    "date_ouverture",
                    "date_cloture",
                    "date_mise_a_jour",
                    "base_juridique",
                    "eligibilite_effectif_minimal",
                    "eligibilite_effectif_maximal",
                    "eligibilite_categorie_taille_entreprise",
                    "eligibilite_annees_existence_minimal",
                    "eligibilite_forme_juridique",
                    "eligibilite_forme_juridique_exclusions",
                    "ciblage_secteur_activite",
                    "ciblage_naf",
                    "ciblage_naf_exclusions",
                    "chainage_paiement",
                ]
            elif i == 1:
                assert len(row) == 31
                assert row[0] == str(aide.pk)
                assert row[11] == f"{aide.organisme.nom} (diffuseur)"
                assert row[15] == "Nationale"
            else:
                assert False


@pytest.mark.django_db
@pytest.mark.parametrize("aide_published__description", ["’≥≤…→‒–ᵉʳ"])
def test_write_aides_to_non_unicode_file(aide_published):
    aide = aide_published
    filename = ""
    with tempfile.NamedTemporaryFile(
        "w", encoding="iso8859_15", delete=False, delete_on_close=False
    ) as f:
        write_aides_as_csv(f, AideToExternalSchemaForHumans, [aide.pk])
        filename = f.name
    with open(filename, "r") as f:
        for i, row in enumerate(csv.reader(f)):
            if i == 1:
                assert row[3] == "'>=<=...->--er"
