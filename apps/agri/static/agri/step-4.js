import { Controller } from "@hotwired/stimulus"

export class Step4 extends Controller {
  static targets = ["commune"]

  _update() {
    this.element.querySelectorAll("button[type=submit]").forEach(elt => {
      elt.disabled = this.communeTarget.querySelector("input[type=hidden]:not(:disabled)") === null
    })
  }

  connect() {
    this._update()
    this.communeTarget.addEventListener("click", evt => {
      this._update()
    })
  }
}
