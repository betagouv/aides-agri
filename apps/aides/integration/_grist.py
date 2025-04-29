import datetime
import itertools
import logging

from django.conf import settings
from pygrister.api import GristApi

from ..grist import (
    ThemeLoader,
    SujetLoader,
    OrganismeLoader,
    ProgrammeLoader,
    TypeLoader,
    ZoneGeographiqueLoader,
    FiliereLoader,
    GroupementProducteursLoader,
)


logger = logging.getLogger(__name__)
gristapi = GristApi(config=settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG)


class GristIntegration:
    def __init__(self):
        _, self.doc_id = gristapi.add_doc(
            f"Intégration {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )

    def replicate_references(self):
        """
        Duplicate the real reference tables we have in the main Grist document
        into a new document dedicated to an integration batch
        """
        grist_loaders = (
            ThemeLoader(),
            SujetLoader(),
            TypeLoader(),
            ZoneGeographiqueLoader(),
            OrganismeLoader(),
            ProgrammeLoader(),
            FiliereLoader(),
            GroupementProducteursLoader(),
        )

        # Then, bulk-add tables with complete schema, except formula columns
        to_add = []
        cols_to_pop = dict()
        for grist_loader in grist_loaders:
            columns = grist_loader.gristapi.list_cols(grist_loader.table)[1]
            cols = [col for col in columns if not col["fields"]["isFormula"]]
            cols_to_pop[grist_loader.table] = [
                col["id"] for col in columns if col["fields"]["isFormula"]
            ]
            to_add.append(
                {
                    "id": grist_loader.table,
                    "columns": cols,
                }
            )
        gristapi.add_tables(to_add, doc_id=self.doc_id)

        # Finally, copy data, once again excluding formula columns
        for grist_loader in grist_loaders:
            _, records = grist_loader.gristapi.list_records(grist_loader.table)
            for record in records:
                record.pop("id")
                for col in cols_to_pop[grist_loader.table]:
                    record.pop(col)
            for batch in itertools.batched(records, n=100):
                gristapi.add_records(
                    grist_loader.table, list(batch), doc_id=self.doc_id
                )
