import csv
import io
import pytest

from aides.interop import write_aides_as_csv


@pytest.mark.django_db
def test_write_aides_as_csv(aide):
    with io.StringIO("") as f:
        write_aides_as_csv(f, [aide.pk])
        f.flush()
        f.seek(0)
        for i, row in enumerate(csv.reader(f)):
            if i == 0:
                assert row == [
                    "id",
                    "parent",
                    "titre",
                    "promesse",
                    "description",
                    "eligibilite",
                    "types_aides",
                    "porteurs",
                    "programmes_parents",
                    "url_source",
                    "cibles",
                    "filieres",
                    "sujets",
                    "eligibilite_geographique",
                    "eligibilite_geographique_exclusions",
                    "date_ouverture",
                    "date_cloture",
                    "date_mise_a_jour",
                    "etat",
                ]
            elif i == 1:
                assert len(row) == 19
                assert row[0] == str(aide.pk)
            else:
                assert False
