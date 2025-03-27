import { Controller } from "@hotwired/stimulus"

export class CheckboxGroupField extends Controller {
  static values = {
    required: Boolean
  }
  static targets = ["input", "error"]

  _hideError() {
    this.errorTarget.classList.add("fr-hidden")
  }

  validate() {
    if (!this.requiredValue) {
      this._hideError()
      return true
    }

    if (this.element.querySelector("input[type=checkbox]:checked")) {
      this._hideError()
      return true
    }

    this.errorTarget.classList.remove("fr-hidden")
    return false
  }
}
