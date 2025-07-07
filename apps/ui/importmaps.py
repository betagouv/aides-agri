from importmap import static


importmaps = {
    "sentry": static("vendor/sentry.js"),
    "stimulus": static("vendor/stimulus.js"),
    "alert": static("ui/controllers/alert.js"),
    "dsfr-form": static("ui/controllers/dsfr_form.js"),
    "matomo": static("ui/controllers/matomo.js"),
    "checkbox-group-field": static("ui/components/checkbox-group-field.js"),
    "select-rich": static("ui/components/select-rich.js"),
}
