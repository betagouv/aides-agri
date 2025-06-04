import { Controller } from "stimulus"

export class Steps extends Controller {
  static targets = ["step4Placeholder"]

  cancelEtablissement() {
    this.step4PlaceholderTarget.innerHTML = ""
  }

  overrideCommune(evt) {
    evt.target.parentElement.removeChild(evt.target.previousElementSibling)
    evt.target.parentElement.removeChild(evt.target.nextElementSibling)
    evt.target.nextElementSibling.classList.remove("fr-hidden")
  }

  overrideDateInstallation(evt) {
    evt.target.nextElementSibling.classList.remove('fr-hidden')
  }

  overrideEffectif(evt) {
    evt.target.nextElementSibling.classList.remove('fr-hidden')
  }
}
