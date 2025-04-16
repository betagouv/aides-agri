import os

import sentry_sdk

from ..base import ENVIRONMENT


SENTRY_DSN = os.environ.get("SENTRY_DSN", "")
SENTRY_PERFORMANCE_SAMPLE_RATE = os.environ.get("SENTRY_PERFORMANCE_SAMPLE_RATE", "0.1")
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment=ENVIRONMENT,
        traces_sample_rate=SENTRY_PERFORMANCE_SAMPLE_RATE,
    )

SENTRY_DSN_UI = os.environ.get("SENTRY_DSN_UI", "")
