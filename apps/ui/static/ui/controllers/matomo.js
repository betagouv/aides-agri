import { Controller } from "stimulus"

export class Matomo extends Controller {
  static targets = ["trackableContent"]

  trackEvent(evt) {
    var _paq = window._paq = window._paq || []
    _paq.push(['trackEvent', evt.target.dataset.eventPage, evt.target.dataset.eventName])
  }

  trackableContentTargetConnected(elt) {
    elt.querySelectorAll("a[target=_blank]").forEach(link => {
      link.dataset.eventPage = elt.dataset.matomoTrackableContentEventPage
      link.dataset.eventName = elt.dataset.matomoTrackableContentEventName
      link.addEventListener("click", evt => this.trackEvent(evt))
    })
  }
}
