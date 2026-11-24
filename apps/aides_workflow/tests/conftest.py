from pytest_factoryboy import register, LazyFixture

from aides.tests import factories as aides_factories

from . import factories


register(
    aides_factories.PublishedAideFactory,
    "aide_published",
    url_descriptif="https://example.com",
)
register(factories.AnomalyFactory, "anomaly", aide=LazyFixture("aide_published"))
