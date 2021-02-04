const authorizedHandler = function () {
  $('.side:not(.section--problem-sidebar)').removeClass('blur');
  $('.sidebar .menu__item:nth-child(1) a').attr("href","/analysing")
  $('.sidebar .menu__item:nth-child(3) a').attr("href","javascript:;")
  $('.sidebar .menu__item:nth-child(4) a').attr("href","/user/analysing")
}
const unauthorizedHandler = function () {
  loginHandler();
  $('.sidebar .menu__item:nth-child(1) a').attr("href","javascript:unauthorizedHandler();")
  $('.sidebar .menu__item:nth-child(3) a').attr("href","javascript:unauthorizedHandler();")
  $('.sidebar .menu__item:nth-child(4) a').attr("href","javascript:unauthorizedHandler();")
}