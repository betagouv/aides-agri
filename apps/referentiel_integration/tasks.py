from django_tasks import task

from .adapters import schema_aide
from .models import DispositifSchemaAide


@task
def create_demarche_agricole_from_dispositif_schema_aide(dispositif_id: int):
    schema_aide.create_demarche_agricole(
        DispositifSchemaAide.objects.get(pk=dispositif_id)
    )
