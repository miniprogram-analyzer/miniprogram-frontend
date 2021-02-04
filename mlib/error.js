var timer = 5
const error_tip = {
  "403": '当前路径不可访问<br>',
  "404": '未找到当前页面<br>'
}
var interval = this.setInterval(function(){
    if(--timer > 0){
        $('.content .text').html(error_tip[error_code] + timer + '秒后返回首页')
    }
    else{
        clearInterval(interval);
        window.location.href = "/m";
    }
},1000)


$('body').on("click", ".content button",
    function () {
        window.location.href = "/m";
    });