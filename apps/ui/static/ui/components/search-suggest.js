import { Suggest } from "./suggest.js"

class SearchSuggest extends Suggest {
  static targets = ["searchbar", "search", "options", "option", "tags"]

  initialize() {
    document.body.addEventListener("click", evt => {
      if (!evt.target.closest("#" + this.element.id)) {
        this._close()
      }
    })
    this.tagsTarget.addEventListener("click", evt => {
      this.searchbarTarget.classList.remove("fr-hidden")
    })
    this.optionsTarget.addEventListener("htmx:afterSwap", evt => {
      this._open()
    })
  }

  choose(evt) {
    super.choose(evt)
    this.searchbarTarget.classList.add("fr-hidden")
  }
}

export { SearchSuggest }
