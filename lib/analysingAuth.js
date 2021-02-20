const authorizedHandler = function () {
  load_uploader();
  $('.drop').removeClass('blur');
  $('.side:not(.section--problem-sidebar)').removeClass('blur');
  $('.sidebar .menu__item:nth-child(1) a').attr("href","javascript:;")
  $('.sidebar .menu__item:nth-child(3) a').attr("href","/code_detail")
  $('.sidebar .menu__item:nth-child(4) a').attr("href","/user#analysis")
}
const unauthorizedHandler = function () {
  loginHandler();
  $('#upload-login').removeClass('hide');
  $('.sidebar .menu__item:nth-child(1) a').attr("href","javascript:unauthorizedHandler();")
  $('.sidebar .menu__item:nth-child(3) a').attr("href","javascript:unauthorizedHandler();")
  $('.sidebar .menu__item:nth-child(4) a').attr("href","javascript:unauthorizedHandler();")
}