initEasyMDE = (elem) => {
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
      {
        name: "highlight",
        title: "Mise en exergue",
        className: "fa fa-exclamation",
        action: editor => {
          const cm = editor.codemirror;
          cm.replaceSelection("!!! Note\n    " + (cm.getSelection() || "Exemple de note"));
        }
      },
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

document.onreadystatechange = evt => {
  if (document.readyState !== "complete") {
    return
  }
  document.querySelectorAll(".easymde-box").forEach(elem => {
    if (elem.EasyMDE === undefined && elem.closest(".empty-form") === null) {
      initEasyMDE(elem)
    }
  })
  document.querySelector(".inline-group").addEventListener("formset:added", (evt) => {
    evt.target.querySelectorAll(".easymde-box").forEach(elem => {
      initEasyMDE(elem)
    })
  })
}
