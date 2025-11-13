document.onreadystatechange = evt => {
  if (document.readyState !== "complete") {
    return
  }
  document.querySelectorAll(".easymde-box").forEach(elem => {
    if (elem.EasyMDE === undefined) {
      elem.EasyMDE = new EasyMDE({
        element: elem,
        inputStyle: "contenteditable",
        toolbar: [
          "bold",
          "italic",
          "link",
          "|",
          "heading-3",
          "unordered-list",
          "ordered-list",
          "|",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "guide"
        ],
        spellChecker: false,
        nativeSpellCheck: true,
        status: ["lines", "words", "cursor"]
      })
    }
  })
}
