import pytest

from ui.context_processors import build_uri_for_qr_code


@pytest.mark.parametrize(
    "url,expected",
    [
        ["/fiche-aide", "http://testserver/fiche-aide?utm_source=qrcode"],
        [
            "/etape-3?param1=1&param2=2",
            "http://testserver/etape-3?param1=1&param2=2&utm_source=qrcode",
        ],
    ],
)
def test_build_uri_for_qr_code(url, expected, rf):
    # GIVEN a request
    request = rf.get(url)

    # WHEN calling the utility function
    uri = build_uri_for_qr_code(request)

    # THEN the context contains the expected URL
    assert uri == expected
