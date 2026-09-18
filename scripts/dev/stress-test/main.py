# /// script
# dependencies = [
#   "requests<3",
#   "ultimate-sitemap-parser<2",
# ]
# ///

import requests
from usp.tree import sitemap_tree_for_homepage

tree = sitemap_tree_for_homepage("https://aides-agri-dev.osc-fr1.scalingo.io")

for page in tree.all_pages():
    url = page.url
    h = requests.head(url)
    print(f"HEAD {url} got HTTP status {h.status_code}")
    r = requests.get(url)
    print(f"GET {url} got HTTP status {r.status_code}")
