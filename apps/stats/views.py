from django.utils.text import slugify
from django.utils import dateformat
from django.views.generic.base import TemplateView

from .models import CounterEntry


class StatsView(TemplateView):
    template_name = "stats/stats.html"

    @staticmethod
    def _build_line_chart_data_for_stat_name(stat_name) -> dict[str, list]:
        x = []
        y = []
        name = []
        all_dates = set()
        for stat_key in (
            CounterEntry.objects.filter(name=stat_name)
            .order_by("key")
            .distinct("key")
            .values_list("key", flat=True)
        ):
            name.append(stat_key)
            x_key = []
            y_key = []
            for entry in CounterEntry.objects.filter(
                name=stat_name, key=stat_key
            ).order_by("date"):
                all_dates.add(entry.date)
                x_key.append(dateformat.format(entry.date, "d/m/Y"))
                y_key.append(entry.count)
            x.append(x_key)
            y.append(y_key)
        return {
            "x": x,
            "y": y,
            "name": name,
            "all_dates": [
                dateformat.format(dt, "d/m/Y") for dt in sorted(list(all_dates))
            ],
        }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        stats = (
            CounterEntry.objects.order_by("name")
            .distinct("name")
            .values_list("name", flat=True)
        )
        context_data.update(
            {
                "summary_data": [
                    {"link": f"#{slugify(name)}", "label": name} for name in stats
                ],
                "stats": {
                    name: self._build_line_chart_data_for_stat_name(name)
                    for name in stats
                },
            }
        )
        return context_data
