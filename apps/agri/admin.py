from admin_ordering.admin import OrderableAdmin
from django.contrib import admin

from .models import AboutPageQuote


@admin.register(AboutPageQuote)
class AboutPageQuoteAdmin(OrderableAdmin, admin.ModelAdmin):
    list_display = ("quote", "author", "ordering")
    list_editable = ("ordering",)
