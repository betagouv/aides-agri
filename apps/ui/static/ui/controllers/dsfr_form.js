import { Controller } from "stimulus"

export class DsfrForm extends Controller {
  static outlets = ["checkbox-group-field", "select-rich"]

  _markInputGroupAsInvalid(inputElement, groupClass) {
    const inputGroup = inputElement.closest(`.${groupClass}`)
    if (inputGroup === null) {
      return
    }
    inputGroup.classList.add(`${groupClass}--error`)
  }

  _markInputGroupAsValid(inputElement, groupClass) {
    const inputGroup = inputElement.closest(`.${groupClass}`)
    if (inputGroup === null) {
      return
    }
    inputGroup.classList.remove(`${groupClass}--error`)
    inputGroup.querySelector(".fr-messages-group").innerHTML = ""
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
    this.element.querySelectorAll("input,select").forEach(elt => {
      const messagesDiv = document.createElement("div")
      const idMessages = elt.id + "-messages"
      messagesDiv.setAttribute("id", idMessages)
      messagesDiv.classList.add("fr-messages-group")
      messagesDiv.setAttribute("aria-live", "polite")
      elt.parentElement.appendChild(messagesDiv)
      elt.setAttribute("aria-describedby", idMessages)
    })
    this.element.querySelectorAll("[type=submit]").forEach(elt => elt.addEventListener("click", evt => {
      let isValid = true
      this.element.querySelectorAll("input,select").forEach(inputElt => {
        const messages = inputElt.parentElement.querySelector(".fr-messages-group")
        messages.innerHTML = ""
        if (!inputElt.checkValidity()) {
          isValid = false
          const errorP = document.createElement("p")
          errorP.classList.add("fr-message", "fr-message--error")
          errorP.textContent = inputElt.validationMessage
          messages.appendChild(errorP)
        }
      })
      if (!this.validateCustomFields()) {
        isValid = false
      }
      if (!isValid) {
        evt.preventDefault()
      }
    }))

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
