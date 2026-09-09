from django.contrib.redirects.models import Redirect
import factory


class RedirectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Redirect

    site_id = 1
    old_path = ""
    new_path = ""
