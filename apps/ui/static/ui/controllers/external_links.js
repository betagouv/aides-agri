import { Controller } from "stimulus"

export class ExternalLinks extends Controller {
  connect() {
    this.element.addEventListener("click", evt => {
      const target = evt.target
      if (!("externalHref" in target.dataset)) {
        return
      }
      const href = target.dataset["externalHref"]
      document.getElementById("modal-external-link-domain").textContent = href.split("/")[2]
      document.getElementById("modal-external-link-href").setAttribute("href", href)
      const eventName = target.classList.contains("demarche") ? "Lien démarche" : "Lien descriptif en mode minimal"
      document.getElementById("modal-external-link-href").setAttribute("data-event-name", eventName)
      window.dsfr(document.getElementById("modal-external-link")).modal.disclose()
    })
  }
}
