const return_origin = function () {
  if (location.search.indexOf("source") > 0) {
    window.location.replace(
      location.search.substring(
        location.search.indexOf("source") + 7
      )
    );
  } else {
    if (window.self !== window.top) {
      window.parent.location.reload();
    } else {
      window.location.replace("/")
    }
  }
}
const username = window.localStorage.getItem("username")
if (username !== undefined && username !== null) {
  axios({
    method: "post",
    url: "/api/getUserinfo",
    data: {
      username
    }
  }).then(res => {
    return_origin()
  }).catch(err => {
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("id")
  })
}