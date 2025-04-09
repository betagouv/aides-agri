import { Controller } from "@hotwired/stimulus"

const sanitizeForSearch = (someString) => {
  return someString.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

export class SelectRich extends Controller {
  static values = {
    multi: Boolean,
    required: Boolean
  }
  static targets = ["button", "entries", "search", "option", "helper", "error", "tags"]

  connect() {
    super.connect()

    document.body.addEventListener("click", evt => {
      if (!evt.target.closest("#" + this.element.id)) {
        this.entriesTarget.classList.remove("fr-collapse--expanded")
      }
    })
    document.body.addEventListener("keydown", evt => {
      if (evt.code === "Escape") {
        this.entriesTarget.classList.remove("fr-collapse--expanded")
      }
    })

    if (this.hasButtonTarget) {
      this.buttonText = this.buttonTarget.textContent.trim()
    }

    if (this.hasSearchTarget) {
      this.optionTargets.forEach(option => {
        option.dataset.normalized = sanitizeForSearch(option.nextElementSibling.textContent)
      })

      if (!this.hasOptionTarget) {
        this.entriesTarget.addEventListener("htmx:afterSwap", evt => {
          this.buttonTarget.click()
        })
      }
    }

    if (this.hasTagsTarget) {
      this.optionTargets.forEach(inputElt => {
        if (inputElt.checked) {
          this._addTag(inputElt)
        }
      })
    }

    this._updateButton()
  }

  focus() {
    this.entriesTarget.classList.add("fr-collapse--expanded")
  }

  search() {
    const q = sanitizeForSearch(this.searchTarget.value)

    // show everything
    this.optionTargets.forEach(elt => {
      elt.parentElement.classList.remove("fr-hidden")
    })

    // hide every non-matching option
    this.optionTargets.forEach(option => {
      if (!option.dataset.normalized.includes(q)) {
        option.parentElement.classList.add("fr-hidden")
      }
    })
  }

  externalSearch(evt) {
    evt.target.disabled = true
    this._unsetErrorState()
  }

  _updateButton() {
    if (!this.hasButtonTarget) {
      return
    }

    if (this.multiValue) {
      const checkedInputs = this.entriesTarget.querySelectorAll("input[type=checkbox]:checked")
      if (checkedInputs.length) {
        if (checkedInputs.length === 1) {
          this.buttonTarget.textContent = "1 option sélectionnée"
        } else {
          this.buttonTarget.textContent = checkedInputs.length + " options sélectionnées"
        }
      } else {
        this.buttonTarget.textContent = this.buttonText
      }
    } else {
      const checkedInput = this.entriesTarget.querySelector("input[type=radio]:checked")
      if (checkedInput) {
        this.buttonTarget.textContent = checkedInput.dataset.label
      }
    }
  }

  _addTag(inputElement) {
    const tagNode = inputElement.nextElementSibling.nextElementSibling.cloneNode(true)
    tagNode.classList.remove("fr-hidden")
    this.tagsTarget.appendChild(tagNode)
  }

  _removeTag(inputElement) {
    const tag = this.tagsTarget.querySelector(`button[data-input=${inputElement.id}]`)
    if (tag) {
      tag.parentElement.removeChild(tag)
    }
  }

  changed(evt) {
    this._updateButton()
    if (this.hasSearchTarget) {
      this.searchTarget.value = ""
      this.search()
    }
    if (this.multiValue) {
      if (this.hasTagsTarget) {
        if (evt.target.checked) {
          this._addTag(evt.target)
        } else {
          this._removeTag(evt.target)
        }
      }
    } else {
      this.entriesTarget.classList.remove("fr-collapse--expanded")
    }
    this.validate()
    this.element.dispatchEvent(new Event("change"))
  }

  _setErrorState() {
    if (this.hasHelperTarget) {
      this.helperTarget.classList.add("fr-hidden")
    }

    this.errorTarget.classList.remove("fr-hidden")
    this.element.classList.add("fr-input-group--error")
  }

  _unsetErrorState() {
    this.errorTarget.classList.add("fr-hidden")
    this.element.classList.remove("fr-input-group--error")
  }

  validate() {
    if (this.requiredValue && !this.entriesTarget.querySelector("input:checked")) {
      this._setErrorState()
      return false
    } else {
      this._unsetErrorState()
      return true
    }
  }
}
