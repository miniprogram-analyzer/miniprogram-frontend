
/*var para = window.location.hash
const pages = ["buglist", "faq", "exp"]
var page = pages.indexOf(para.split("#")[1]) + 1
console.log(page)
if (page <= 0) {
    page = 1;
}
var idb = "#b-" + page
var idd = "#d-" + page
$("#navis .bar li").removeClass("sel");
$("#navis .bd").removeClass("sel");
$(idb).addClass("sel");
$(idd).addClass("sel");
$("#navis .bar li a").click(function () {
    $("#navis .bar li").removeClass("sel");
    $(this).parent().addClass("sel");

    var id = "#d-" + $(this).parent().data("id");
    $("#navis .bd").removeClass("sel");
    $(id).addClass("sel");
});*/
var list_html = "<ul>"
for (var i = 0; i < 20; i++) {
    list_html += '<li><div class="postimg"><a><div class="t_head"></div></a></div>'
    list_html += '<div class="title"><div class="t_title"><span class="t_cate">['
    list_html += '<div class="Skeleton Skeleton--text">&nbsp;</div>'
    list_html += ']</span>'
    list_html += '<div class="Skeleton Skeleton--text" style="width:160px">&nbsp;</div>'
    list_html += '</a></div><div class="t_info"><span>'
    list_html += '<div class="Skeleton Skeleton--text" style="width:80px">&nbsp;</div>'
    list_html += '</span><span>'
    list_html += '<div class="Skeleton Skeleton--text">&nbsp;</div>发表'
    if(location.pathname != '/answering'){
        //移动端
        list_html += '</span><span class="numb"><img src="/img/like.svg" />'
        list_html += '<div class="Skeleton Skeleton--text" style="width:20px">&nbsp;</div>'
        list_html += '</span></div><div class="t_info t_detail">'
        list_html += '<div class="Skeleton Skeleton--text" style="width:100%">&nbsp;</div>'
        '</div></div></li>'
    }
    else{
        //桌面端
        list_html += '</span><span>'
        list_html += '<div class="Skeleton Skeleton--text" style="width:300px">&nbsp;</div>'
        list_html += '</span><span class="numb"><img src="/img/like.svg" />'
        list_html += '<div class="Skeleton Skeleton--text" style="width:20px">&nbsp;</div>'
        list_html += '</span></div></div></li>'
    }
}
list_html += "</ul>"
$("#discussion_content").html(list_html);
var time_change = function(e){
    var now = new Date()
    var today = new Date(now.getFullYear(),now.getMonth(),now.getDate())
    var delta = today - e
    if(delta <= 0){
        var d2 = now - e
        if (d2 < 60000){
            return "刚刚"
        }
        else if(d2 < 3600000){
            return (Math.floor(d2/60000)+"分钟前")
        }
        else{
            return (Math.floor(d2/3600000)+"小时前")
        }
    }
    else if(delta <= 86400000){
        return "昨天"
    }
    else if(delta <= 864000000){
        return (Math.ceil(delta/86400000)+"天前")
    }
    else{
        return (e.getFullYear() + '/' + (e.getMonth()+1) + '/' + e.getDate())
    }
}
$.ajax({
    type: 'POST',
    url: api_printList,
    data: {
        choice: "discuss",
        isentire: 0,
        serial: 1,
        size: 20,
    },
    success: function (res) {
        const con_re = new RegExp("<.+?>","g");
        if(res.successFlag === "Y"){
            list_html = "<ul>"
            for (var i=res.msg.length - 1;i >= 0;i--){
                list_html += '<li><div class="postimg"><a><div class="t_head"></div></a></div>'
                list_html += '<div class="title"><div class="t_title"><span class="t_cate">['
                list_html += res.msg[i].partition
                list_html += ']</span><a target="_blank" href="'
                list_html += (location.pathname == '/answering' ? '/discussion?id=' : '/m/discussion?id=')
                list_html += res.msg[i].serial
                list_html += '" class="t_cate_title">'
                list_html += res.msg[i].title
                list_html += '</a></div><div class="t_info"><span><a>'
                list_html += res.msg[i].guestid
                list_html += '</a></span><span>'
                var time = new Date(res.msg[i].time)
                list_html += time_change(time) + '发表'
                if(location.pathname != '/answering'){
                    //移动端
                    list_html += '</span><span class="numb"><img src="/img/like.svg" />'
                    list_html += res.msg[i].numof
                    list_html += '</span></div><div class="t_info t_detail">'
                    list_html += res.msg[i].content.replace(con_re,'').substring(0,200)
                    '</div></div></li>'
                }
                else{
                    //桌面端
                    list_html += '</span><span>'
                    list_html += res.msg[i].content.replace(con_re,'').substring(0,200)
                    list_html += '</span><span class="numb"><img src="/img/like.svg" />'
                    list_html += res.msg[i].numof
                    list_html += '</span></div></div></li>'
                }
            }
            list_html += "</ul>"
        }
        $("#discussion_content").html(list_html);
        /*var len = Math.min(12, res.msg.length)
        var homeQ = ""
        if (len == 0) {
            homeQ =
                "<div class=\"tips\"><p><a target=\"_blank\" href=\"/asking\">还没有问题，我来提问</a></p></div>"
        } else {
            for (var i = 0; i < len; i++) {
                var tempQ =
                    "<li><a target=\"_blank\" href=\"/pages/question_detail.html?Qid=" + res
                    .msg[i].serial + "\">" + res.msg[i].detail + "</a></li>"
                homeQ += tempQ
            }
        }
        $("#d-2 .bdr").html(homeQ);
        if (window.localStorage) {
            var storage = window.localStorage;
            storage.setItem("homeQ", homeQ);
        }*/
    },
    error: function(err){
        console.log(err)
    }
});

$('body').on("click", ".new_post",
    function () {
        if (window.localStorage.getItem("id") !== null && window.localStorage.getItem("id") !== undefined) {
            window.location.href = "/asking"
        }
        else if (document.querySelector("div#mask") === null) {
            var titleLogin = '<span class="active" onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/login' + (nightMode ? '?night=1' : "") + '\');">登录</span><span onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/register' + (nightMode ? '?night=1' : "") + '\')">注册</span>';
            popWin.showWin("400", "620", titleLogin, "/login" + (nightMode ? '?night=1' : ""));
        }
    });

$('body').on("click", "#nav-left:not(.disabled)",
    function () {
        $('#nav-left').addClass("disabled")
        $('#nav-right').removeClass("disabled")
        $('.classify').removeClass("classify-second")
    });

$('body').on("click", "#nav-right:not(.disabled)",
    function () {
        $('#nav-right').addClass("disabled")
        $('#nav-left').removeClass("disabled")
        $('.classify').addClass("classify-second")
    });

$('body').on("click", ".classify td",
    function () {
        $('.classify_item').removeClass("current")
        $(this).addClass("current")
    });

if(location.hash !== undefined && location.hash !== null && location.hash !== ''){
    $('.classify_item').removeClass("current")
    $('#classify-' + location.hash.substring(1) + '.classify_item').addClass("current")
}