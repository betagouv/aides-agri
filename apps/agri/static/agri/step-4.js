import { FormWithCustomFields } from "form-with-custom-fields"

export class Step4 extends FormWithCustomFields {
  static targets = ["commune"]

  validate() {
    let isValid = super.validate()

    isValid ||= this.hasCommuneTarget

    return isValid
  }
}
