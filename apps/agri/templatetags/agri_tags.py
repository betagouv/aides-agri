from django import template
from django.urls import reverse

register = template.Library()


@register.filter()
def agri_theme_to_step2_link(theme:int) -> str:
    return reverse("agri:step-2") + "?theme=" + str(theme)
