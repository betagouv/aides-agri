from datetime import date

from django.core.management.base import BaseCommand
from django.db.models import Count, Field, QuerySet, Q

from stats.models import CounterEntry

from ...models import Type, Sujet, Organisme, ZoneGeographique


class Command(BaseCommand):
    @staticmethod
    def _build_counter_entries(
        name: str, qs: QuerySet, key_field: Field
    ) -> list[CounterEntry]:
        for_date = date.today()
        entries = []
        for key, count in (
            qs.filter(aides__isnull=False)
            .annotate(
                aides_count=Count(
                    "aides",
                    filter=Q(aides__first_published_at__lte=for_date),
                )
            )
            .values_list(key_field.name, "aides_count")
        ):
            entries.append(CounterEntry(name=name, date=for_date, key=key, count=count))
        return entries

    def handle(self, *args, **options):
        to_create = []

        to_create.extend(
            self._build_counter_entries(
                "Nombre d’aides par type", Type.objects.all(), Type.nom.field
            )
        )

        to_create.extend(
            self._build_counter_entries(
                "Nombre d’aides par sujet", Sujet.objects.all(), Sujet.nom_court.field
            )
        )

        to_create.extend(
            self._build_counter_entries(
                "Nombre d’aides par département",
                ZoneGeographique.objects.departements(),
                ZoneGeographique.code.field,
            )
        )

        to_create.extend(
            self._build_counter_entries(
                "Nombre d’aides par organisme",
                Organisme.objects.all(),
                Organisme.nom.field,
            )
        )

        CounterEntry.objects.bulk_create(to_create)
