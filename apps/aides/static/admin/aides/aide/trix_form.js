document.addEventListener("readystatechange", evt => {
  if (!document.location.pathname.endsWith("/change/")) {
    return
  }
  if (document.readyState !== "complete") {
    return
  }

  // on "trix-change" custom event, dispatch "change" native event on the hidden input
  document.querySelectorAll("trix-editor").forEach(elt => {
    elt.addEventListener("trix-change", evt => {
      document.getElementById(evt.target.getAttribute("input")).dispatchEvent(new Event("change", {bubbles: true}))
    })
  })
})
