from django.utils.module_loading import autodiscover_modules


def autodiscover():
    """Force the import of the `grist` modules of each `INSTALLED_APPS`."""
    autodiscover_modules("grist")
