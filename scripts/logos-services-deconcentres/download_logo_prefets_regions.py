import asyncio
from pathlib import Path

from playwright.async_api import async_playwright, Error


regions = {
    "01": "https://daaf.guadeloupe.agriculture.gouv.fr",
    "02": "https://daaf.martinique.agriculture.gouv.fr",
    "03": "https://daaf.guyane.agriculture.gouv.fr",
    "04": "https://daaf.reunion.agriculture.gouv.fr",
    "06": "https://daaf.mayotte.agriculture.gouv.fr",
    "11": "https://driaaf.ile-de-france.agriculture.gouv.fr",
    "24": "https://draaf.centre-val-de-loire.agriculture.gouv.fr",
    "27": "https://draaf.bourgogne-franche-comte.agriculture.gouv.fr",
    "28": "https://draaf.normandie.agriculture.gouv.fr",
    "32": "https://draaf.hauts-de-france.agriculture.gouv.fr",
    "44": "https://draaf.grand-est.agriculture.gouv.fr",
    "52": "https://draaf.pays-de-la-loire.agriculture.gouv.fr",
    "53": "https://draaf.bretagne.agriculture.gouv.fr",
    "75": "https://draaf.nouvelle-aquitaine.agriculture.gouv.fr",
    "76": "https://draaf.occitanie.agriculture.gouv.fr",
    "84": "https://draaf.auvergne-rhone-alpes.agriculture.gouv.fr",
    "93": "https://draaf.paca.agriculture.gouv.fr",
    "94": "https://draaf.corse.agriculture.gouv.fr",
}


async def main():
    async with async_playwright() as p:
        browser = await p.firefox.launch()
        page = await browser.new_page()
        for code, url in regions.items():
            logo = f"data/pref-region-{code}.png"
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
