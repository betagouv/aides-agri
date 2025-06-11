import qrcode
from django.conf import settings


def ui_tools_tokens(request):
    qr = qrcode.QRCode(image_factory=qrcode.image.svg.SvgPathImage, box_size=7)
    qr.add_data(request.build_absolute_uri())
    return {
        "qrcode": qr.make_image().to_string(encoding="unicode"),
        "UI_ENVIRONMENT": settings.ENVIRONMENT,
        "UI_MATOMO_SITE_ID": settings.MATOMO_SITE_ID,
        "UI_SENTRY_PUBLIC_KEY": settings.SENTRY_UI_PUBLIC_KEY,
        "UI_SENTRY_PROJECT_ID": settings.SENTRY_UI_PROJECT_ID,
    }
