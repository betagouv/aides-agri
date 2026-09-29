from pytest_factoryboy import register, LazyFixture

from aides.models import Aide
from aides.tests import factories as aides_factories  # noqa

from .factories import FeedbackOnAideFactory

register(aides_factories.OrganismeFactory, "organisme")
register(
    aides_factories.AideFactory,
    "aide_published",
    organisme=LazyFixture("organisme"),
    status=Aide.Status.VALIDATED,
    is_published=True,
)

register(FeedbackOnAideFactory, "feedback_on_aide", aide=LazyFixture("aide_published"))
register(FeedbackOnAideFactory, "feedback_on_results")
