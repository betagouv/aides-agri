import { Controller } from "@hotwired/stimulus"

export class Step3 extends Controller {
  static targets = ["siret", "siretSearch"]

  _update() {
    this.element.querySelectorAll("button[type=submit]").forEach(elt => {
      elt.disabled = this.siretTarget.value === ""
    })
  }

  connect() {
    this._update()
  }

  chooseSiret(evt) {
    const btn = evt.target.closest("button")
    const siret = btn.dataset.siret
    this.siretTarget.value = siret
    this.siretSearchTarget.value = siret
    btn.parentElement.parentElement.remove()
    this._update()
  }
}
