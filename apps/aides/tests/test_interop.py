import csv
import io
import pytest

from aides.interop import write_aides_as_csv, AideToSchema


@pytest.mark.django_db
def test_write_aides_as_csv(aide):
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
            else:
                assert False
