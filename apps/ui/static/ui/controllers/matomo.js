import { Controller } from "stimulus"

export class Matomo extends Controller {
  trackEvent(evt) {
    var _paq = window._paq = window._paq || []
    _paq.push(['trackEvent', evt.target.dataset.eventPage, evt.target.dataset.eventName])
  }
}
