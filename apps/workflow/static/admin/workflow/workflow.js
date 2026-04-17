document.onreadystatechange = evt => {
  if (document.readyState !== "complete") {
    return
  }
  document.querySelectorAll("[data-aide-id]").forEach(elt => {
    elt.addEventListener("click", evt => {
      document.getElementById("dialog-" + elt.dataset.aideId).showModal()
    })
  })
}