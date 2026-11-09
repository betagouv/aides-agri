import logging
from datetime import datetime
from hashlib import sha1

import requests
from django.utils.timezone import make_aware
from django_tasks import task
from markdownify import markdownify

from ..constants import USER_AGENT
from ..models import RawAideRegionOccitanie


logger = logging.getLogger(__name__)
URL = "https://www.laregion.fr/spip.php?page=json_articles_rubrique&id_rubrique=31015,31099,32799&groupes=495,551,548&direction=oui&textescomplets=oui&mots=4143&mots_enfants=oui"


@task
def import_region_occitanie_feed() -> tuple[int, int, int]:
    r = requests.get(URL, headers={"User-Agent": USER_AGENT}, timeout=5)
    r.raise_for_status()
    existing_ids = set(
        RawAideRegionOccitanie.objects.values_list("id_externe", flat=True)
    )
    count_new = 0
    count_updated = 0
    imported_ids = set()
    for row in r.json():
        id_externe = row["url"].split("/")[-1]
        rowhash = sha1(str(row).encode(), usedforsecurity=False).hexdigest()
        imported_ids.add(id_externe)

        if id_externe in existing_ids:
            raw_aide = RawAideRegionOccitanie.objects.get(id_externe=id_externe)
            if raw_aide.hash == rowhash:
                continue
            count_updated += 1
        else:
            raw_aide = RawAideRegionOccitanie(
                source="REGION_OCCITANIE",
                id_externe=id_externe,
                url_source=row["url"],
            )
            count_new += 1
        raw_aide.hash = rowhash
        raw_aide.date_modification = make_aware(
            datetime.fromisoformat(row["date_modification"])
        )
        raw_aide.titre = markdownify(row["titre"].strip())
        raw_aide.chapo = markdownify(row["chapo"].strip())
        raw_aide.texte = row["texte"].strip()
        if "thematiques" in row:
            raw_aide.thematiques = [s.strip() for s in row["thematiques"].split(",")]
        if "publics" in row:
            raw_aide.publics = [s.strip() for s in row["publics"].split(",")]

        raw_aide.save(source="Ingestion du flux RSS")

    count_soft_deleted = RawAideRegionOccitanie.objects.exclude(
        id_externe__in=imported_ids
    ).update(status=RawAideRegionOccitanie.Status.DELETED)

    logger.info(f"Nouvelles aides importées : {count_new}")
    logger.info(f"Aides mises à jour : {count_updated}")
    logger.info(f"Aides marquées supprimées : {count_soft_deleted}")

    return count_new, count_updated, count_soft_deleted
