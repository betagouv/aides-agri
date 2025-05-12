from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup


def do_request(
    url: str, method: str = "get", headers: dict | None = None, verify_tls: bool = True
) -> requests.Response:
    if headers is None:
        headers = dict()
    headers.update({"User-Agent": "AidesAgri/1.0 ; david.guillot@beta.gouv.fr"})

    response = requests.request(
        method, url, headers=headers, timeout=5, verify=verify_tls
    )
    response.raise_for_status()  # Raise an HTTPError for bad responses

    return response


def get_content_from_url(
    url: str, verify_tls: bool = True, with_cache: bool = True
) -> bytes:
    if with_cache:
        parsed_url = urlparse(url)
        split_path = parsed_url.path.split("/")
        if not split_path[-1]:
            split_path.pop()
        cache_dir_path = f".data/{parsed_url.hostname}{'/'.join(split_path[:-1])}"
        cache_file_path = f"{cache_dir_path}/{split_path[-1]}"
        try:
            with open(cache_file_path, "r") as f:
                content = f.read()
        except FileNotFoundError:
            response = do_request(url, verify_tls=verify_tls)
            content = response.content
            Path(cache_dir_path).mkdir(parents=True, exist_ok=True)
            with open(cache_file_path, "wb") as f:
                f.write(content)
    else:
        response = do_request(url, verify_tls=verify_tls)
        content = response.content

    return content


def get_soup_from_url(
    url: str, verify_tls: bool = True, with_cache: bool = True
) -> BeautifulSoup:
    content = get_content_from_url(url, verify_tls=verify_tls, with_cache=with_cache)
    soup = BeautifulSoup(content, "html.parser")
    return soup
