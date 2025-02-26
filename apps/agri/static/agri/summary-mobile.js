import { Controller } from "@hotwired/stimulus"

class SummaryMobile extends Controller {
  toggle(evt) {
    evt.target.disabled = true

    if (this.element.style.left) {
      this.element.style.left = ""
    } else {
      this.element.style.left = "0px"
    }

    setTimeout(() => {
      evt.target.classList.toggle("fr-icon-arrow-right-line")
      evt.target.classList.toggle("fr-icon-arrow-left-line")
      evt.target.disabled = false
    }, 300)
  }
}

export { SummaryMobile }
