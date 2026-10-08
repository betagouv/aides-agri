import { Controller } from "stimulus"

export class ExternalLinks extends Controller {
  connect() {
    /**
    Set up a <body>-wide click event delegation
     that expects <button> elements carrying data-external-link-href
     in order to open a confirmation modal before allowing user to open an external link.
    Tracking data can be set using `data-external-link-tracking-page` and `data-external-link-tracking-event`.
    **/
    this.element.addEventListener("click", evt => {
      const target = evt.target
      if (!("externalLinkHref" in target.dataset)) {
        return
      }
      const href = target.dataset["externalLinkHref"]
      const trackingPage = target.dataset["externalLinkTrackingPage"]
      const trackingEvent = target.dataset["externalLinkTrackingEvent"]
      document.getElementById("modal-external-link-domain").textContent = href.split("/")[2]
      const linkElement = document.getElementById("modal-external-link-href")
      linkElement.setAttribute("href", href)
      if (trackingPage) {
        linkElement.setAttribute("data-event-page", trackingPage)
      }
      if (trackingEvent) {
        linkElement.setAttribute("data-event-name", trackingEvent)
      }
      window.dsfr(document.getElementById("modal-external-link")).modal.disclose()
    })
  }
}
