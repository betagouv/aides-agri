import enum
import logging


logger = logging.getLogger(__name__)


class AbstractAidesSource:
    def _scrape(self) -> list[dict]:
        raise NotImplementedError

    def _enrich_aide(self, aide: dict) -> None:
        raise NotImplementedError

    def get_aides(self) -> list[dict]:
        aides = self._scrape()
        for aide in aides:
            self._enrich_aide(aide)
        return aides


class AbstractRawFields(enum.Enum):
    @property
    def name_full(self):
        return f"raw_{self.name}"
