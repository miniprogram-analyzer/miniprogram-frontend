var timer = 5
var interval = this.setInterval(function(){
    if(--timer > 0){
        $('.content .text').html('未找到当前页面<br>' + timer + '秒后返回首页')
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