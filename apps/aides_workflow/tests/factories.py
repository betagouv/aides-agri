import factory

from aides_workflow.models import Anomaly


class AnomalyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Anomaly

    aide = None
    faulty_url_field = Anomaly.FaultyUrlField.URL_DESCRIPTIF
    faulty_url = factory.Faker("url")
    http_status_code = 404
