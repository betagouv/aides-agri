import { Controller } from "@hotwired/stimulus"

export class CheckboxGroupField extends Controller {
  static values = {
    required: Boolean
  }
  static targets = ["input", "error"]

  _unsetErrorState() {
    this.errorTarget.classList.add("fr-hidden")
    this.element.classList.remove("fr-input-group--error")
  }

  _setErrorState() {
    this.errorTarget.classList.remove("fr-hidden")
    this.element.classList.add("fr-input-group--error")
  }

  validate() {
    if (!this.requiredValue) {
      this._unsetErrorState()
      return true
    }

    if (this.element.querySelector("input[type=checkbox]:checked")) {
      this._unsetErrorState()
      return true
    }

    this._setErrorState()
    return false
  }
}
