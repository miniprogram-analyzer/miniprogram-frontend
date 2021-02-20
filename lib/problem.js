function test_info() {
  vm.problem_choice = 1;
  location.hash = "#detail"
  $('.sidebar .menu__item:nth-child(1) a').addClass("active")
  $('.sidebar .menu__item:nth-child(2) a').removeClass("active")
  $('.sidebar .menu__item:nth-child(4) a').removeClass("active")
}

function test_upload() {
  if (window.localStorage.getItem("user_id") !== null && window.localStorage.getItem("user_id") !== undefined) {
    vm.problem_choice = 2;
    location.hash = "#upload"
    $('.sidebar .menu__item:nth-child(1) a').removeClass("active")
    $('.sidebar .menu__item:nth-child(2) a').addClass("active")
    $('.sidebar .menu__item:nth-child(4) a').removeClass("active")
  }
  else if (document.querySelector("div#mask") === null) {
      loginPopwin();
  }
}

function test_score() {
  if (window.localStorage.getItem("user_id") !== null && window.localStorage.getItem("user_id") !== undefined) {
    vm.problem_choice = 4;
    location.hash = "#score"
    $('.sidebar .menu__item:nth-child(1) a').removeClass("active")
    $('.sidebar .menu__item:nth-child(2) a').removeClass("active")
    $('.sidebar .menu__item:nth-child(4) a').addClass("active")
  }
  else if (document.querySelector("div#mask") === null) {
      loginPopwin();
  }
}