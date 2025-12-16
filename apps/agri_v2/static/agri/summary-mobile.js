import { Controller } from "stimulus"

export class SummaryMobile extends Controller {
  static shiftProperty = "--summary-mobile-shift"

  connect() {
    this.originalShift = this.element.style.width
    this.element.style.setProperty(SummaryMobile.shiftProperty, this.originalShift)
  }

  toggle(evt) {
    evt.target.disabled = true

    if (this.element.style.getPropertyValue(SummaryMobile.shiftProperty) === this.originalShift) {
      this.element.style.setProperty(SummaryMobile.shiftProperty, "0px")
    } else {
      this.element.style.setProperty(SummaryMobile.shiftProperty, this.originalShift)
    }

    setTimeout(() => {
      evt.target.classList.toggle("fr-icon-arrow-right-line")
      evt.target.classList.toggle("fr-icon-arrow-left-line")
      evt.target.disabled = false
    }, 300)
  }
}
