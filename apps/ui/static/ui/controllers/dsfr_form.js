import { Controller } from "stimulus"

export class DsfrForm extends Controller {
  static outlets = ["checkbox-group-field", "select-rich"]

  _markInputGroupAsInvalid(inputElement, groupClass) {
    const inputGroup = inputElement.closest(`.${groupClass}`)
    if (inputGroup === null) {
      return
    }
    inputGroup.classList.add(`${groupClass}--error`)
    inputGroup.querySelector(".fr-info-text")?.classList.add("fr-hidden")
    inputGroup.querySelector(".fr-error-text")?.classList.remove("fr-hidden")
    inputElement.setCustomValidity("")
  }

  _markInputGroupAsValid(inputElement, groupClass) {
    const inputGroup = inputElement.closest(`.${groupClass}`)
    if (inputGroup === null) {
      return
    }
    inputGroup.classList.remove(`${groupClass}--error`)
    inputGroup.querySelector(".fr-error-text")?.classList.add("fr-hidden")
  }

  validateCustomFields() {
    let isValid = true

    this.checkboxGroupFieldOutlets.forEach(outlet => {
      isValid &= outlet.validate()
    })

    this.selectRichOutlets.forEach(outlet => {
      isValid &= outlet.validate()
    })

    return isValid
  }

  connect() {
    this.element.addEventListener("submit", evt => {
      if (!this.validateCustomFields()) {
        evt.preventDefault()
      }
    })

    for (let i = 0; i < this.element.elements.length; i++) {
      const inputElement = this.element.elements[i]
      const groupClass = (inputElement.tagName === "SELECT") ? "fr-select-group" : "fr-input-group"

      inputElement.addEventListener("invalid", evt => {
        this._markInputGroupAsInvalid(inputElement, groupClass)
        this.validateCustomFields()
      })

      inputElement.addEventListener("valid", evt => {
        this._markInputGroupAsValid(inputElement, groupClass)
      })

      inputElement.addEventListener("input", evt => {
        if (evt.target.checkValidity()) {
          this._markInputGroupAsValid(inputElement, groupClass)
        }
      })
    }
  }
}
