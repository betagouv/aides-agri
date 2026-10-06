import os
import re
from collections import defaultdict

from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.mail import send_mail


class Command(BaseCommand):
    pattern = re.compile(r'.*idtxt="([^"]+)" titretxt="([^"]+)".*')

    def handle(self, *args, **options):
        path = "/tmp/jorf-results"
        results = defaultdict(list)
        for txtfile in os.listdir(path):
            with open(f"{path}/{txtfile}") as f:
                for line in f:
                    idtxt, titretxt = re.match(self.__class__.pattern, line).groups()
                    results[(idtxt, titretxt)].append(txtfile)

        message = ""
        for txt, search_terms in results.items():
            message += (
                f"\n- {txt[1]} (https://www.legifrance.gouv.fr/jorf/id/{txt[0]})\n"
            )
            message += f"  ↳ pour les mots-clés suivants : {', '.join(search_terms)}"

        if message:
            message = f"""Bonjour,

Dans le JORF de ce matin, les textes suivants semblent pertinents :
{message}

Bonne journée !
                """
            send_mail(
                "Veille JORF",
                message,
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
