const listEditors = () => {
  django.jQuery.get("../concurrency/list", data => {
    if (!document.querySelector(".messagelist")) {
      document.getElementById("content-start").insertAdjacentHTML("afterbegin", '<ul class="messagelist"></ul>')
    }
    document.querySelector(".messagelist").innerHTML = data
  })
  setTimeout(listEditors, 1000)
}

document.onreadystatechange = (evt) => {
  if (document.readyState !== "complete") {
    return
  }
  document.getElementById("content").querySelector("form").addEventListener("change", evt => {
    django.jQuery.post("../concurrency/write", {
      csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
    })
  })
  listEditors()
}
