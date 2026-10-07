import { Controller } from "stimulus"

export class DsfrForm extends Controller {
  static outlets = ["select-rich"]

  _markInputGroupAsInvalid(inputElement) {
    const groupClass = this._getInputElementGroupClass(inputElement)
    const groupElement = this._getInputElementGroupElement(inputElement)
    if (groupElement === null) {
      return
    }
    groupElement.classList.add(`${groupClass}--error`)
  }

  _markInputGroupAsValid(inputElement) {
    const groupClass = this._getInputElementGroupClass(inputElement)
    const groupElement = this._getInputElementGroupElement(inputElement)
    if (groupElement === null) {
      return
    }
    groupElement.classList.remove(`${groupClass}--error`)
    groupElement.querySelector(".fr-messages-group").innerHTML = ""
  }

  validateCustomFields() {
    let isValid = true

    this.selectRichOutlets.forEach(outlet => {
      isValid &= outlet.validate()
    })

    return isValid
  }

  _getInputElementGroupClass(inputElement) {
    let groupClass
    if (inputElement.tagName === "SELECT") {
      groupClass = "fr-select-group"
    } else if (inputElement.getAttribute("type") === "radio") {
      groupClass = "fr-fieldset"
    } else {
      groupClass = "fr-input-group"
    }
    return groupClass
  }

  _getInputElementGroupElement(inputElement) {
    const groupClass = this._getInputElementGroupClass(inputElement)
    return inputElement.closest(`.${groupClass}`)
  }

  connect() {
    // insert messages placeholder on every field or field group
    for (let elt of this.element.elements) {
      const groupElement = this._getInputElementGroupElement(elt)
      if (groupElement === null) {
        continue
      }
      const idMessages = elt.name + "-messages"
      if (document.getElementById(idMessages)) {
        continue
      }
      const messagesDiv = document.createElement("div")
      messagesDiv.setAttribute("id", idMessages)
      messagesDiv.classList.add("fr-messages-group")
      messagesDiv.setAttribute("aria-live", "polite")
      groupElement.appendChild(messagesDiv)
      groupElement.setAttribute(
        "aria-labelledby",
        groupElement.getAttribute("aria-labelledby") + " " + idMessages
      )
    }

    // validate every relevant field before form is submitted
    this.element.querySelectorAll("[type=submit]").forEach(elt => elt.addEventListener("click", evt => {
      let isValid = true
      for (let inputElt of this.element.elements) {
        const groupElement = this._getInputElementGroupElement(inputElt)
        if (groupElement === null) {
          continue
        }
        const messagesElement = groupElement.querySelector(".fr-messages-group")
        messagesElement.innerHTML = ""
        if (!inputElt.checkValidity()) {
          isValid = false
          const errorP = document.createElement("p")
          errorP.classList.add("fr-message", "fr-message--error")
          errorP.textContent = inputElt.validationMessage
          messagesElement.appendChild(errorP)
        }
      }
      if (!this.validateCustomFields()) {
        isValid = false
      }
      if (!isValid) {
        evt.preventDefault()
      }
    }))

    for (let inputElt of this.element.elements) {
      inputElt.addEventListener("invalid", evt => {
        this._markInputGroupAsInvalid(inputElt)
        this.validateCustomFields()
      })

      inputElt.addEventListener("valid", evt => {
        this._markInputGroupAsValid(inputElt)
      })

      inputElt.addEventListener("input", evt => {
        if (evt.target.checkValidity()) {
          this._markInputGroupAsValid(inputElt)
        }
      })
    }
  }
}
