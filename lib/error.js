var scene=document.getElementById("scene");var parallax=new Parallax(scene);
var timer = 6
const error_tip = {
  "403": '当前路径不可访问<br>',
  "404": '未找到当前页面<br>'
}
var interval = this.setInterval(function(){
    if(--timer > 0){
        $('article p').html(error_tip[error_code] + timer + '秒后返回首页')
    }
    else{
        clearInterval(interval);
        window.location.href = "/";
    }
},1000)


$('body').on("click", "article button",
    function () {
        window.location.href = "/";
    });