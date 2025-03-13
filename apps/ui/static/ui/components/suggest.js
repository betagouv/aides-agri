import { Controller } from "@hotwired/stimulus"

const sanitizeForSearch = (someString) => {
  return someString.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

class Suggest extends Controller {
  static targets = ["search", "options", "option", "tags"]

  initialize() {
    this.optionTargets.forEach(option => {
      option.dataset.normalized = sanitizeForSearch(option.textContent)
    })
    document.body.addEventListener("click", evt => {
      if (!evt.target.closest("#" + this.element.id)) {
        this._close()
      }
    })
  }

  _open() {
    this.optionsTarget.classList.remove("fr-hidden")
  }

  _close() {
    this.optionsTarget.classList.add("fr-hidden")
  }

  focus() {
    if (this.searchTarget.value !== "") {
      this.search()
    }
  }

  search() {
    const q = sanitizeForSearch(this.searchTarget.value)

    // show everything
    this.optionTargets.forEach(elt => {
      elt.classList.remove("fr-hidden")
    })

    // hide every non-matching option
    this.optionTargets.forEach(option => {
      if(!option.dataset.normalized.includes(q)) {
        option.classList.add("fr-hidden")
      }
    })

    this._open()
  }

  choose(evt) {
    evt.target.parentElement.querySelectorAll(".fr-hidden *").forEach(child => {
      const tag = child.cloneNode(true)
      tag.removeAttribute("disabled")
      this.tagsTarget.appendChild(tag)
    })
    this.searchTarget.value = ""
    this._close()
  }
}

export { Suggest }
