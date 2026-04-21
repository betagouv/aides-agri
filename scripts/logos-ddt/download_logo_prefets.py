import asyncio
import csv
import typing
from pathlib import Path

from playwright.async_api import async_playwright, Error


def _get_departements() -> typing.Generator[tuple[str, str]]:
    with open("data/urls.csv") as f:
        reader = csv.reader(f)
        for row in reader:
            yield row[0], row[1]


async def main():
    async with async_playwright() as p:
        browser = await p.firefox.launch()
        page = await browser.new_page()
        for code, url in _get_departements():
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
