var query_string = location.search.substring(0, location.search.indexOf('&code=')).replace(/%26/g, '&').replace(/%2F/g, '/').replace(/%3D/g, '=').replace(/%3F/g, '?')

if (query_string.indexOf("night=1") > 0) {
  query_string = query_string.replace(/&night=1/, "")
  document.documentElement.setAttribute("class", "dark");
} else if (query_string.indexOf("night=0") > 0) {
  query_string = query_string.replace(/&night=0/, "")
  document.documentElement.setAttribute("class", "light");
}
var redirect_url = query_string.replace(/\?source=/,"")

const statusText = (text) => {
  document.getElementsByClassName('text')[0].innerHTML = text
}
const statusIcon = (icon) => {
  setTimeout(() => {
    document.getElementsByClassName('el-loading-spinner2')[0].innerHTML = '<i class="far ' + icon + '"></i>'
  }, 500)
}
const goBack = () => {
  window.location.replace(redirect_url)
}

axios.get(api_oauth + "?" + location.search.substring(location.search.indexOf('&code=') + 1)).then(res => {
  document.getElementsByClassName('path')[0].setAttribute("class", "path fade");
  if (res.data.successFlag == 'Y') {
    if (window.localStorage) {
      var storage = window.localStorage;
      storage.setItem("username", res.data.data.username);
      storage.setItem("user_id", res.data.data.id);
      storage.setItem("identity", res.data.data.identity || "同学");
    }
    statusText('认证成功, 即将返回')
    statusIcon('fa-check')
    setTimeout(() => {
      goBack()
    }, 1500)
  } else {
    document.getElementsByClassName('button-disabled')[0].setAttribute("class", "button");
    statusText('认证失败, 信息无效')
    statusIcon('fa-times')
  }
}).catch(err => {
  document.getElementsByClassName('button-disabled')[0].setAttribute("class", "button");
  statusText('网络异常, 请稍后重试')
  statusIcon('fa-exclamation')
})