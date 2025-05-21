import os

import sentry_sdk

from ..base import ENVIRONMENT


SENTRY_DSN = os.getenv("SENTRY_DSN", "")
SENTRY_PERFORMANCE_SAMPLE_RATE = os.getenv("SENTRY_PERFORMANCE_SAMPLE_RATE", 0.1)
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment=ENVIRONMENT,
        traces_sample_rate=SENTRY_PERFORMANCE_SAMPLE_RATE,
    )

SENTRY_UI_PUBLIC_KEY = os.getenv("SENTRY_UI_PUBLIC_KEY", "")
SENTRY_UI_PROJECT_ID = os.getenv("SENTRY_UI_PROJECT_ID", "")
