import { Controller } from "stimulus"

export class UserDataToMatomo extends Controller {
  static values = {
    page: String,
    fields: Array
  }

  go(formdataEvent) {
    var _paq = window._paq = window._paq || []
    for (const [fieldName, value] of formdataEvent.formData.entries()) {
      if (!this.fieldsValue.includes(fieldName)) {
        continue
      }
      _paq.push(['trackEvent', this.pageValue, "Donnée visiteur : " + fieldName, value])
    }
  }
}
