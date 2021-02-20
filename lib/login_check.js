const return_origin = function () {
  if (location.search.indexOf("source") > 0) {
    if(location.search.indexOf("&night=") > 0){
      window.location.replace(
        location.search.substring(
          location.search.indexOf("source") + 7 , location.search.indexOf("&night=")
        )
      );
    }
    else {
      window.location.replace(
        location.search.substring(
          location.search.indexOf("source") + 7
        )
      );
    }
  } else {
    if (window.self !== window.top) {
      window.parent.location.reload();
    } else {
      window.location.replace("/")
    }
  }
}
const user_id = window.localStorage.getItem("user_id")
if (user_id !== undefined && user_id !== null) {
  axios({
    method: "post",
    url: api_getUserinfo,
    data: {
      id: user_id
    }
  }).then(res => {
    return_origin()
  }).catch(err => {
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("user_id")
    window.localStorage.removeItem("identity")
    window.localStorage.removeItem("email")
    window.localStorage.removeItem("phone")
    window.localStorage.removeItem("avatar")
  })
}

var nav_link = false
if (location.search.indexOf("source") > 0) {
  nav_link = true
}