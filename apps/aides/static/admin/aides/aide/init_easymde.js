document.onreadystatechange = evt => {
  if (document.readyState !== "complete") {
    return
  }
  document.querySelectorAll(".easymde-box").forEach(elem => {
    const options = JSON.parse(elem.getAttribute("data-easymde-options"))
    options["element"] = elem
    if (elem.EasyMDE === undefined) {
      elem.EasyMDE = new EasyMDE(options)
    }
  })
}
