const authorizedHandler = function () {}
const unauthorizedHandler = function () {
  location.replace('/login' + (nightMode ? '?night=1' : ""))
}