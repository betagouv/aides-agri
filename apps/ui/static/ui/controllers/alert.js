import { Controller } from "stimulus"

/**
 * This controller is meant to be used at the <body> level.
 * When clicking on a "close" button, the alert containing the button is remove from DOM.
 */
export class Alert extends Controller {
  close(evt) {
    const alertElement = evt.target.parentElement
    alertElement.parentElement.removeChild(alertElement)
  }
}
