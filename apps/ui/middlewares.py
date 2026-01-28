from django.conf import settings
from django.http import HttpRequest, HttpResponse


class DemoSiteModalMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        response: HttpResponse = self.get_response(request)
        if (
            settings.UI_DEMO_SITE_MODAL_COOKIE_NAME
            and settings.UI_DEMO_SITE_MODAL_COOKIE_NAME not in request.COOKIES
        ):
            response.set_cookie(
                settings.UI_DEMO_SITE_MODAL_COOKIE_NAME, "1", httponly=True
            )
        return response
