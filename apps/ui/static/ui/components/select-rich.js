import { Controller } from "stimulus"

const sanitizeForSearch = (someString) => {
  return someString.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

export class SelectRich extends Controller {
  static values = {
    name: String,
    multi: Boolean,
    required: Boolean,
    keepDefaultButtonLabel: Boolean
  }
  static targets = ["button", "entries", "search", "searchButton", "option", "helper", "error", "tags", "addButton"]
  static classExpanded = "fr-collapse--expanded"

  connect() {
    super.connect()
    this.hasChanged = false

    // Close the select-rich element on click elsewhere or hit Esc
    document.body.addEventListener("click", evt => {
      if (this.entriesTarget.classList.contains("fr-collapse--expanded") && !evt.target.closest("#" + this.element.id)) {
        this._close()
      }
    })
    document.body.addEventListener("keydown", evt => {
      if (evt.code === "Escape" && this.entriesTarget.classList.contains("fr-collapse--expanded")) {
        this._close()
      }
    })

    // Save original button text to be able to restore it when all options are unchosen
    if (this.hasButtonTarget) {
      this.buttonText = this.buttonTarget.textContent.trim()
    }

    // in case of internal search, prepare all options to be searched
    if (this.hasSearchTarget) {
      this.searchTarget.addEventListener("change", evt  => {evt.stopPropagation()})
      this.optionTargets.forEach(option => {
        option.dataset.normalized = sanitizeForSearch(option.nextElementSibling.textContent)
      })
    }

    // in case of external search, collect submit buttons to disable in order to let [Enter] trigger search
    if (this.hasSearchButtonTarget) {
      const form = this.element.closest("form")
      if (form) {
        this.buttonsToDisable = form.querySelectorAll("button[type=submit]")
      } else {
        this.buttonsToDisable = []
      }
    }

    // if tags are enabled, initialize them
    if (this.hasTagsTarget) {
      this.optionTargets.forEach(inputElt => {
        if (inputElt.checked) {
          this._addTag(inputElt)
        }
      })
      this._updateButtons()
    }

    this._updateButton()
  }

  focus() {
    if (this.hasOptionTarget) {
      this._open()
    }
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

  toggleExternalSearchFocus() {
    this.buttonsToDisable.forEach(elt => {
      if (elt !== this.searchButtonTarget) {
        elt.disabled = !elt.disabled
        if (elt.disabled) {
          elt.setAttribute("type", "button")
        } else {
          elt.setAttribute("type", "submit")
        }
      }
    })
  }

  externalSearch(evt) {
    this._unsetErrorState()
  }

  optionTargetConnected() {
    if (this.hasSearchButtonTarget) {
      this.focus()
    }
  }

  _updateButton() {
    if (!this.hasButtonTarget) {
      return
    }

    if (this.multiValue && !this.keepDefaultButtonLabelValue) {
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
    this.tagsTarget.insertBefore(tagNode, this.addButtonTarget)
  }

  _removeTag(inputElement) {
    const tag = this.tagsTarget.querySelector(`button[data-input=${inputElement.id}]`)
    if (tag) {
      tag.parentElement.removeChild(tag)
    }
  }

  clickOnTag(evt) {
    document.getElementById(evt.target.dataset.input).click()
  }

  _updateButtons() {
    this._updateButton()
    if (this.hasTagsTarget) {
      if (this.tagsTarget.querySelector(".fr-tag")) {
        this.buttonTarget.classList.add("fr-hidden")
        this.addButtonTarget.classList.remove("fr-hidden")
      } else {
        this.addButtonTarget.classList.add("fr-hidden")
        this._show()
      }
    }
  }

  _show() {
    this.buttonTarget.classList.remove("fr-hidden")
  }

  show() {
    this._show()
    this._open()
  }

  _open() {
    if (this.hasButtonTarget) {
      this.buttonTarget.setAttribute("aria-expanded", true)
    } else {
      this.entriesTarget.classList.add(SelectRich.classExpanded)
    }
  }

  _close() {
    if (this.hasButtonTarget) {
      this.buttonTarget.setAttribute("aria-expanded", false)
    } else {
      this.entriesTarget.classList.remove(SelectRich.classExpanded)
    }
    this._updateButtons()
    if (this.hasChanged) {
      this.hasChanged = false
      this.element.dispatchEvent(new Event("change", {bubbles: true}))
    }
  }

  _isOpened() {
    return this.entriesTarget.classList.contains(SelectRich.classExpanded)
  }

  changed(evt) {
    this._updateButton()
    this.hasChanged = true
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
      if (this._isOpened()) {
        evt.stopPropagation()
      }
    } else {
      this._close()
    }
  }

  _setErrorState() {
    if (this.hasHelperTarget) {
      this.helperTarget.classList.add("fr-hidden")
    }

    this.errorTarget.classList.remove("fr-hidden")
    this.element.classList.add("fr-select-group--error")
  }

  _unsetErrorState() {
    this.errorTarget.classList.add("fr-hidden")
    this.element.classList.remove("fr-select-group--error")
  }

  validate() {
    if (this.requiredValue && !this.entriesTarget.querySelector("input:checked") && !this.element.closest("form").querySelector(`input[type=hidden][name=${this.nameValue}][value]`)) {
      this._setErrorState()
      return false
    } else {
      this._unsetErrorState()
      return true
    }
  }

  noop() {}
}
