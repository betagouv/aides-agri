import argparse
import datetime

from datagouv import Client
from django.conf import settings
from django.core.management.base import BaseCommand

from ...models import Aide
from ...interop import AideToSchema, write_aides_as_csv, AideToExternalSchema


class Command(BaseCommand):
    DATASET_PAYLOAD = {
        "title": "Aides publiées sur Aides Agri",
        "description": "Différents exports des aides publiées sur Aides Agri : selon le schéma interministériel des aides aux entreprises, selon un schéma étendu, etc.",
        "organization": settings.AIDES_DATAGOUV_ORGANIZATION_ID,
    }
    RESOURCE_FOR_SCHEMA_PAYLOAD = {
        "title": "Aides publiées sur Aides Agri, selon le schéma interministériel des aides aux enteprises",
        "schema": {
            "name": "etalab/dispositif-aide-professionnels",
            "url": "https://schema.data.gouv.fr/etalab/dispositif-aide-professionnels/",
            "version": "0.2.0",
        },
    }
    RESOURCE_FOR_CUSTOM_PAYLOAD = {
        "title": "Aides publiées sur Aides Agri, selon un schéma détaillé et exhaustif",
    }

    def _generate_file(self, schema: type[AideToSchema], filename: str):
        qs = Aide.objects.published_validated().values_list("pk", flat=True)
        with open(filename, "w") as f:
            write_aides_as_csv(f, schema, qs)

    def _create_or_update_resource(
        self,
        dataset_id: str,
        resource_id_setting: str,
        resource_create_payload: dict[str, str],
        filename: str,
    ):
        if not getattr(settings, resource_id_setting):
            self.stdout.write(
                f"No {resource_id_setting} found, creating a Resource within Dataset {dataset_id}..."
            )
            resource_id = (
                self.client.dataset(dataset_id)
                .create_static(payload=resource_create_payload, file_to_upload=filename)
                .id
            )
            self.stdout.write(f"Resource {resource_id} created!")
        else:
            resource_id = getattr(settings, resource_id_setting)
            self.client.resource(resource_id).update({}, file_to_upload=filename)
            self.stdout.write(f"Resource {resource_id} updated with new file!")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.client = Client(
            environment=settings.DATAGOUV_ENVIRONMENT,
            api_key=settings.DATAGOUV_API_TOKEN,
        )

    def add_arguments(self, parser):
        parser.add_argument(
            "--write",
            action=argparse.BooleanOptionalAction,
            default=True,
            help="Generate files but perform no write operations on data.gouv.fr.",
        )

    def handle(self, *args, **options):
        write = options.get("--write")

        # ensure dataset exists
        if write and not settings.AIDES_DATAGOUV_DATASET_ID:
            assert settings.AIDES_DATAGOUV_ORGANIZATION_ID
            self.stdout.write(
                f"No DATASET_ID found, creating a Dataset for Organization {settings.AIDES_DATAGOUV_ORGANIZATION_ID}..."
            )
            dataset_id = (
                self.client.dataset()
                .create(
                    {
                        "title": "Aides publiées sur Aides Agri",
                        "description": "Différents exports des aides publiées sur Aides Agri : selon le schéma interministériel des aides aux entreprises, selon un schéma étendu, etc.",
                        "organization": settings.AIDES_DATAGOUV_ORGANIZATION_ID,
                    }
                )
                .id
            )
            self.stdout.write(f"Dataset {dataset_id} created!")
        else:
            dataset_id = settings.AIDES_DATAGOUV_DATASET_ID

        filename = f"/tmp/aides-agri-schema-dispositif-aide-professionnels-{datetime.date.today().isoformat()}.csv"
        self._generate_file(AideToSchema, filename)
        if write:
            self._create_or_update_resource(
                dataset_id,
                "AIDES_DATAGOUV_RESOURCE_ID_FOR_SCHEMA",
                self.__class__.RESOURCE_FOR_SCHEMA_PAYLOAD,
                filename,
            )

        filename = (
            f"/tmp/aides-agri-schema-complet-{datetime.date.today().isoformat()}.csv"
        )
        self._generate_file(AideToExternalSchema, filename)
        if write:
            self._create_or_update_resource(
                dataset_id,
                "AIDES_DATAGOUV_RESOURCE_ID_FOR_CUSTOM",
                self.__class__.RESOURCE_FOR_CUSTOM_PAYLOAD,
                filename,
            )
