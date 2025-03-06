import { Controller } from "@hotwired/stimulus"

export class Step5 extends Controller {
  _update() {
    const submitButtons = this.element.querySelectorAll("button[type=submit]")
    let enableSubmit = false
    this.element.querySelectorAll("input[type=checkbox]").forEach(elt => {
      if (elt.checked) {
        enableSubmit = true
      }
    })
    submitButtons.forEach(btn => {btn.disabled = !enableSubmit})
  }

  connect() {
    this._update()
  }

  change() {
    this._update()
  }
}
