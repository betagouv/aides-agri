const getForm = () => {
  return document.getElementById("content").querySelector("form")
}

const listUsers = () => {
  django.jQuery.post("../concurrency/read", {
    csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
  })
  django.jQuery.get("../concurrency/list", data => {
    if (!document.querySelector(".messagelist")) {
      document.getElementById("content-start").insertAdjacentHTML("afterbegin", '<ul class="messagelist"></ul>')
    }
    document.querySelector(".messagelist").innerHTML = data
    if (document.querySelector(".messagelist [data-concurrency]")) {
      if (getForm().querySelector("[type=submit]")) {
        window.location.reload()
      }
    } else {
      if (!getForm().querySelector("[type=submit]")) {

      }
    }
  })
  setTimeout(listUsers, 5000)
}

document.addEventListener("readystatechange", evt => {
  if (!document.location.pathname.endsWith("/change/")) {
    return
  }
  if (document.readyState !== "complete") {
    return
  }
  django.jQuery.post("../concurrency/release", {
    csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
  })
  getForm().addEventListener("change", evt => {
    django.jQuery.post("../concurrency/write", {
      csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
    })
  })
  setTimeout(listUsers, 1000)
})
