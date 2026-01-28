from ..base import ENVIRONMENT, MIDDLEWARE


UI_DEMO_SITE_MODAL_COOKIE_NAME = ""
if ENVIRONMENT != "prod":
    UI_DEMO_SITE_MODAL_COOKIE_NAME = "demo-site-modal-shown"
    MIDDLEWARE.append("ui.middlewares.DemoSiteModalMiddleware")
