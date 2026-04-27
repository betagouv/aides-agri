import asyncio
from pathlib import Path

from playwright.async_api import async_playwright, Error


departements = {
    "01": "https://www.ain.gouv.fr",
    "02": "https://www.aisne.gouv.fr",
    "03": "https://www.allier.gouv.fr",
    "04": "https://www.alpes-de-haute-provence.gouv.fr",
    "05": "https://www.hautes-alpes.gouv.fr",
    "06": "https://www.alpes-maritimes.gouv.fr",
    "07": "https://www.ardeche.gouv.fr",
    "08": "https://www.ardennes.gouv.fr",
    "09": "https://www.ariege.gouv.fr",
    "10": "https://www.aube.gouv.fr",
    "11": "https://www.aude.gouv.fr",
    "12": "https://www.aveyron.gouv.fr",
    "13": "https://www.bouches-du-rhone.gouv.fr",
    "14": "https://www.calvados.gouv.fr",
    "15": "https://www.cantal.gouv.fr",
    "16": "https://www.charente.gouv.fr",
    "17": "https://www.charente-maritime.gouv.fr",
    "18": "https://www.cher.gouv.fr",
    "19": "https://www.correze.gouv.fr",
    "21": "https://www.cote-dor.gouv.fr",
    "22": "https://www.cotes-darmor.gouv.fr",
    "23": "https://www.creuse.gouv.fr",
    "24": "https://www.dordogne.gouv.fr",
    "25": "https://www.doubs.gouv.fr",
    "26": "https://www.drome.gouv.fr",
    "27": "https://www.eure.gouv.fr",
    "28": "https://www.eure-et-loir.gouv.fr",
    "29": "https://www.finistere.gouv.fr",
    "2A": "https://www.corse-du-sud.gouv.fr",
    "2B": "https://www.haute-corse.gouv.fr",
    "30": "https://www.gard.gouv.fr",
    "31": "https://www.haute-garonne.gouv.fr",
    "32": "https://www.gers.gouv.fr",
    "33": "https://www.gironde.gouv.fr",
    "34": "https://www.herault.gouv.fr",
    "35": "https://www.ille-et-vilaine.gouv.fr",
    "36": "https://www.indre.gouv.fr",
    "37": "https://www.indre-et-loire.gouv.fr",
    "38": "https://www.isere.gouv.fr",
    "39": "https://www.jura.gouv.fr",
    "40": "https://www.landes.gouv.fr",
    "41": "https://www.loir-et-cher.gouv.fr",
    "42": "https://www.loire.gouv.fr",
    "43": "https://www.haute-loire.gouv.fr",
    "44": "https://www.loire-atlantique.gouv.fr",
    "45": "https://www.loiret.gouv.fr",
    "46": "https://www.lot.gouv.fr",
    "47": "https://www.lot-et-garonne.gouv.fr",
    "48": "https://www.lozere.gouv.fr",
    "49": "https://www.maine-et-loire.gouv.fr",
    "50": "https://www.manche.gouv.fr",
    "51": "https://www.marne.gouv.fr",
    "52": "https://www.haute-marne.gouv.fr",
    "53": "https://www.mayenne.gouv.fr",
    "54": "https://www.meurthe-et-moselle.gouv.fr",
    "55": "https://www.meuse.gouv.fr",
    "56": "https://www.morbihan.gouv.fr",
    "57": "https://www.moselle.gouv.fr",
    "58": "https://www.nievre.gouv.fr",
    "59": "https://www.nord.gouv.fr",
    "60": "https://www.oise.gouv.fr",
    "61": "https://www.orne.gouv.fr",
    "62": "https://www.pas-de-calais.gouv.fr",
    "63": "https://www.puy-de-dome.gouv.fr",
    "64": "https://www.pyrenees-atlantiques.gouv.fr",
    "65": "https://www.hautes-pyrenees.gouv.fr",
    "66": "https://www.pyrenees-orientales.gouv.fr",
    "67": "https://www.bas-rhin.gouv.fr",
    "68": "https://www.haut-rhin.gouv.fr",
    "69": "https://www.rhone.gouv.fr",
    "70": "https://www.haute-saone.gouv.fr",
    "71": "https://www.saone-et-loire.gouv.fr",
    "72": "https://www.sarthe.gouv.fr",
    "73": "https://www.savoie.gouv.fr",
    "74": "https://www.haute-savoie.gouv.fr",
    "75": "https://www.paris.gouv.fr",
    "76": "https://www.seine-maritime.gouv.fr",
    "77": "https://www.seine-et-marne.gouv.fr",
    "78": "https://www.yvelines.gouv.fr",
    "79": "https://www.deux-sevres.gouv.fr",
    "80": "https://www.somme.gouv.fr",
    "81": "https://www.tarn.gouv.fr",
    "82": "https://www.tarn-et-garonne.gouv.fr",
    "83": "https://www.var.gouv.fr",
    "84": "https://www.vaucluse.gouv.fr",
    "85": "https://www.vendee.gouv.fr",
    "86": "https://www.vienne.gouv.fr",
    "87": "https://www.haute-vienne.gouv.fr",
    "88": "https://www.vosges.gouv.fr",
    "89": "https://www.yonne.gouv.fr",
    "90": "https://www.territoire-de-belfort.gouv.fr",
    "91": "https://www.essonne.gouv.fr",
    "92": "https://www.hauts-de-seine.gouv.fr",
    "93": "https://www.seine-saint-denis.gouv.fr",
    "94": "https://www.val-de-marne.gouv.fr",
    "95": "https://www.val-doise.gouv.fr",
    "971": "https://www.guadeloupe.gouv.fr",
    "972": "https://www.martinique.gouv.fr",
    "973": "https://www.guyane.gouv.fr",
    "974": "https://www.la-reunion.gouv.fr",
    "976": "https://www.mayotte.gouv.fr",
}


async def main():
    async with async_playwright() as p:
        browser = await p.firefox.launch()
        page = await browser.new_page()
        for code, url in departements.items():
            logo = f"data/pref-{code}.png"
            if Path(logo).is_file():
                continue
            try:
                print(f"Go to {url}")
                await page.goto(url)
                print("Take screenshot")
                await page.locator(".fr-footer__brand").screenshot(path=logo)
                print("Done")
            except Error as e:
                print("Failed, moving on")
                print(e)
        await browser.close()


asyncio.run(main())
