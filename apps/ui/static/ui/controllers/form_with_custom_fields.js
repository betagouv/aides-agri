import { Controller } from "@hotwired/stimulus"

export class FormWithCustomFields extends Controller {
  static outlets = ["checkbox-group-field", "select-rich"]

  validate() {
    let isValid = true

    this.checkboxGroupFieldOutlets.forEach(outlet => {
      isValid &= outlet.validate()
    })

    this.selectRichOutlets.forEach(outlet => {
      isValid &= outlet.validate()
    })

    return isValid
  }

  submit(event) {
    if (!this.validate()) {
      event.preventDefault()
    }
  }
}
