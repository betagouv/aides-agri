import csv

from bs4 import BeautifulSoup, PageElement
import requests


def _extract_field(icon_element: PageElement) -> str:
    return icon_element.find_next_sibling("p").text.strip() if icon_element else "n/a"


def main():
    r = requests.get(
        "https://chambres-agriculture.fr/le-reseau-chambres/qui-sommes-nous/annuaire-des-chambres",
        headers={"User-Agent": "AidesAgri/1.0"},
    )
    soup = BeautifulSoup(r.text, "html.parser")
    with open("data/ca.csv", "w") as f:
        writer = csv.DictWriter(
            f, fieldnames=["nom", "adresse", "mail", "telephone", "url", "image_url"]
        )
        for container in soup.find_all(class_="container-detail-content news-list"):
            chambre = dict()
            chambre["nom"] = container.find("h2").text.strip()
            chambre["image_url"] = container.find("img").attrs["src"]
            chambre["adresse"] = _extract_field(
                container.find(class_="icon-adresse-batiments")
            )
            chambre["mail"] = _extract_field(container.find(class_="icon-enveloppe"))
            chambre["telephone"] = _extract_field(
                container.find(class_="icon-telephone")
            )
            chambre["url"] = _extract_field(container.find(class_="icon-internet"))
            writer.writerow(chambre)


if __name__ == "__main__":
    main()
