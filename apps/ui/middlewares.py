from django.conf import settings
from django.contrib.redirects.middleware import RedirectFallbackMiddleware
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


class RedirectMiddleware(RedirectFallbackMiddleware):
    class FakeRequest:
        """
        A fake HttpRequest that stores only host and path,
        and that returns the path as the full path.

        Useful for using the django.contrib.redirects.middleware.RedirectFallbackMiddleware
        without caring about querystring
        """
        def __init__(self, request: HttpRequest):
            self.path = request.path
            self.host = request.get_host()

        def get_host(self):
            return self.host

        def get_full_path(self, *args, **kwargs):
            return self.path

    def process_response(self, request, response):
        request = self.__class__.FakeRequest(request)
        return super().process_response(request, response)
