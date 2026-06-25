import pytest

from referentiel.models import Demarche, Porteur

from integration.adapters.schema_dispositif_aide import (
    SchemaDispositifAideDemarcheAdapter,
)


@pytest.mark.django_db
@pytest.mark.parametrize("raw_data_schema_dispositif_aide__cibles", ["professionnels"])
@pytest.mark.parametrize(
    "raw_data_schema_dispositif_aide__programmes_parents", ["France 2030"]
)
@pytest.mark.parametrize(
    "raw_data_schema_dispositif_aide__types_aides", ["financement|formation"]
)
@pytest.mark.parametrize(
    "raw_data_schema_dispositif_aide__eligibilite_geographique", ["REG-75|DEP-13"]
)
@pytest.mark.parametrize(
    "raw_data_schema_dispositif_aide__porteurs",
    [[{"nom": "FranceAgriMer", "siren": "", "roles": ["financeur"]}]],
)
@pytest.mark.parametrize(
    "raw_data_schema_dispositif_aide__base_juridique",
    [
        [
            {
                "libelle": "Décision n° 123456",
                "lien": "https://www.franceagrimer.fr/decision-123456",
            }
        ]
    ],
)
def test_create_demarche_from_raw_data_schema_dispositif_aide(
    raw_data_schema_dispositif_aide,
    organisme_fam,
    programme_france_2030,
    territoire_reg75,
    territoire_dep13,
):
    # GIVEN no Demarche, and a RawDataSchemaDispositifAide
    assert not Demarche.objects.exists()

    # WHEN integrating
    adapter = SchemaDispositifAideDemarcheAdapter()
    adapter.create_demarche(raw_data_schema_dispositif_aide)

    # THEN a Demarche has been created
    assert Demarche.objects.count() == 1
    # no error has been raised
    assert not adapter.errors
    demarche = Demarche.objects.first()
    assert demarche.titre == raw_data_schema_dispositif_aide.titre
    # cibles have been properly identified and mapped
    assert demarche.cibles == Demarche.Cible.PROFESSIONNELS
    # programmes have been identified and mapped
    assert demarche.programmes_parents.count() == 1
    assert demarche.programmes_parents.first() == programme_france_2030
    # types have been properly identified and mapped
    assert demarche.types_aides == Demarche.Type.FINANCEMENT | Demarche.Type.FORMATION
    # Porteurs have been properly created
    assert demarche.porteurs.count() == 1
    porteur = demarche.porteurs.first().porteur_set.first()
    assert porteur.organisme == organisme_fam
    assert porteur.roles == Porteur.Role.FINANCEUR
    # Territoires have been properly linked
    assert set(demarche.eligibilite_geographique.all()) == {
        territoire_reg75,
        territoire_dep13,
    }
    # BaseJuridique objects have been properly created
    assert demarche.bases_juridiques.count() == 1
    base_juridique = demarche.bases_juridiques.first()
    assert (
        base_juridique.libelle
        == raw_data_schema_dispositif_aide.base_juridique[0]["libelle"]
    )
    assert (
        base_juridique.url == raw_data_schema_dispositif_aide.base_juridique[0]["lien"]
    )
