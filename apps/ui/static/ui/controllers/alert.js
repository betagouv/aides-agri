import { Controller } from "stimulus"

export class Alert extends Controller {
  close() {
    this.element.parentElement.removeChild(this.element)
  }
}
