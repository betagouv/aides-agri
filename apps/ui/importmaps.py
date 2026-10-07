from importmap import static


importmaps = {
    "sentry": static("vendor/sentry.js"),
    "stimulus": static("vendor/stimulus.js"),
    "alert": static("ui/controllers/alert.js"),
    "dsfr-form": static("ui/controllers/dsfr_form.js"),
    "external-links": static("ui/controllers/external_links.js"),
    "matomo": static("ui/controllers/matomo.js"),
    "select-rich": static("ui/components/select-rich.js"),
    "userdata-to-matomo": static("ui/controllers/userdata-to-matomo.js"),
}
