from django_tasks import task

from .models import Aide, Organisme


@task()
def enrich_aide(aide_pk: int, raw_data_mapping: dict[str, str]):
    aide = Aide.objects.get(pk=aide_pk)
    for raw_data_key, field_name in raw_data_mapping.items():
        if field_name == "organisme":
            aide.organisme = Organisme.objects.get(
                nom__iexact=aide.raw_data[raw_data_key]
            )
    aide.save()
