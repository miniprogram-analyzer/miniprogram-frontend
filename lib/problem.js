function test_info() {
  vm.uploadTest = false;
  $('.sidebar .menu__item:nth-child(1) a').addClass("active")
  $('.sidebar .menu__item:nth-child(2) a').removeClass("active")
}

function test_upload() {
  if (window.localStorage.getItem("user_id") !== null && window.localStorage.getItem("user_id") !== undefined) {
    vm.uploadTest = true;
    $('.sidebar .menu__item:nth-child(1) a').removeClass("active")
    $('.sidebar .menu__item:nth-child(2) a').addClass("active")
  }
  else if (document.querySelector("div#mask") === null) {
      var titleLogin = '<span class="active" onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/login' + (nightMode ? '?night=1' : "") + '\');">登录</span><span onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/register' + (nightMode ? '?night=1' : "") + '\')">注册</span>';
      popWin.showWin("400", "620", titleLogin, "/login" + (nightMode ? '?night=1' : ""));
  }
}