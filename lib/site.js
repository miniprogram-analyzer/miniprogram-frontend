﻿if (location.host === "www.ithome.com" || location.host === "new.ithome.com" || location.host === "lapin.ithome.com") document.domain = "ithome.com";

$(document).ready(function () {
    $(document).click(function () {
        $(".view_setting").slideUp(300,
            function () {
                $('.item-link-5').removeClass('il5-bg');
            });
    });
    $(".post_content img").each(function () {
        $(this).parent("p").css("text-align", "center");
        $(this).parent("a").css("border", "0");
    });

    $(".view_setting").click(function (e) {
        e.stopPropagation();
    });
    $('.post_content a').find('> img').parent().css('box-shadow', '0 0');
});

if (document.getElementById("ifcomment")) {

    var viewHeight = $(window).height();
    var contentHeight = $(".post_content").height();
    if (viewHeight > contentHeight) {
        if ($("#ifcomment").attr("src") == null) {
            $("#ifcomment").attr("src", '//dyn.ithome.com/comment/' + $("#ifcomment").attr("data") + (nightMode ? "?night=1" : ""));
        }
    }

    $(window).scroll(function () { //绑定浏览器窗口对象
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();

        var postContent = $(".post_content");
        var postConentHeight = postContent.height();
        var postContentTop = postContent.offset().top;

        if (postConentHeight + postContentTop < scrollTop + windowHeight || windowHeight > contentHeight) {
            //if (scrollTop + windowHeight + 300 >= scrollHeight  || windowHeight > contentHeight ) {
            if ($("#ifcomment").attr("src") === null ||
                $("#ifcomment").attr("src") === "" ||
                $("#ifcomment").attr("src") === "about:blank") {
                $("#ifcomment").attr("src", '//dyn.ithome.com/comment/' + $("#ifcomment").attr("data") + (nightMode ? "?night=1" : ""));
            }
        }
        if (scrollTop + windowHeight + 100 >= scrollHeight) {

            try {
                document.getElementById('ifcomment').contentWindow.AutoifHeight();
            } catch (e) {}

            if ($("#ifcomment").contents().find("#commentlatest").is(':checked')) {
                $("#ifcomment").contents().find("#latestpagecomment")[0].click();
            } else {
                if ($("#ifcomment").contents().find("#pagecomment").length > 0)
                    $("#ifcomment").contents().find("#pagecomment")[0].click();
            }
        }
    });
}

// 夜间模式
if ("undefined" != typeof nightMode && nightMode) {
    $("#dark-mode div").addClass("night");
    $("#dark-mode div").text("夜间");
}

$("#dark-mode").click(function () {
    var t = $("#dark-mode div");
    if (t.hasClass("night")) {
        t.removeClass("night");
        t.text("白天");
        $.cookie("nightMode", 0, {
            expires: 365,
            /*domain: "ithome.com",*/
            path: "/"
        });
        $("body").removeClass("night");
        nightMode = false;
    } else {
        t.addClass("night");
        t.text("夜间");
        $.cookie("nightMode", 1, {
            expires: 365,
            /*domain: "ithome.com",*/
            path: "/"
        });
        $("body").addClass("night");
        nightMode = true;
    }
    var iframes = $("iframe");
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        var src = iframe.src;
        if(src.indexOf("utils/pdfjs") >= 0){
            if (src.indexOf("&night=1") > 0 && !nightMode) {
                iframe.src = iframe.src.replace("&night=1", "");
            } else if (src.indexOf("&night=1") < 0 && nightMode) {
                iframe.src = iframe.src + "&night=1";
            }
        }
        else if (src.indexOf("utils/validator/") < 0) {
            if (src.indexOf("?night=1") > 0 && !nightMode) {
                iframe.src = iframe.src.replace("?night=1", "");
            } else if (src.indexOf("?night=1") < 0 && nightMode) {
                iframe.src = iframe.src + "?night=1";
            }
        }
    }
    if (document.querySelector("div#maskTop div#maskTitle") !== null) {
        $("div#maskTop div#maskTitle span:nth-child(1)").attr("onclick", "$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_login.html' + (nightMode ? '?night=1' : '') + '\');")
        $("div#maskTop div#maskTitle span:nth-child(2)").attr("onclick", "$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_register.html' + (nightMode ? '?night=1' : '') + '\')")
    }
});

// 注册登录相关
function topcallback(html) {
    $('#toplogin').html(html);
    $('#toplogin>a').addClass("s");
    $("#avatar").addClass("mu");
}
function rightcallback(html) {
    $('#personal').html(html);
}

//topcallback("<div class=\"prelogin\"><a href=\"https://my.ruanmei.com/?page=register\" target=\"_blank\">注册</a><a href=\"javascript:; \" class=\"login\">登录</a></div>");//$.getScript("./login/login.js");
var username = window.localStorage.getItem("username")
var id = window.localStorage.getItem("id")
var toplogin_script = "<div class=\"prelogin\"><a href=\"https://my.ruanmei.com/?page=register\" target=\"_blank\">注册</a><a href=\"javascript:; \" class=\"login\">登录</a></div>"
var rightlogin_script = "<div class=\"info-row\"><div id=\"avatar\"></div><div id=\"username\"><a class=\"login title\">点此登录</a><a class=\"register\">还没有账号？点此注册</a></div></div>"
if (username !== undefined && username !== null) {
    $.ajax({
        type: 'POST',
        url: '/api/getUserinfo',
        data: {
            username: username
        },
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            toplogin_script = "<a href=\"javascript:;\" class=\"item-link\" id=\"rm_avatar\"><div></div>" + username + "</a><div id=\"avatar\" class=\"menu\"><ul><li><a href=\"/pages/user.html\" target=\"_blank\">个人中心</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href=\"/pages/user.html\" target=\"_blank\">修改资料</a></li><li class=\"line\"></li><li style=\"text-align:center;\"><a id=\"btnLogout\" href=\"javascript:;\">退出登录</a></li></ul></div>"
            rightlogin_script = "<div class=\"info-row\"><div id=\"avatar\"></div><div id=\"username\"><a href=\"/pages/user.html\" target=\"_blank\" class=\"realname title\">" + username + "&nbsp;&nbsp;同学</a><a href=\"/pages/user.html\" target=\"_blank\" class=\"id\">" + id + "</a></div></div>"
            topcallback(toplogin_script);
            rightcallback(rightlogin_script);
        },
        error: function (err) {
            window.localStorage.removeItem("username")
            window.localStorage.removeItem("id")
            topcallback(toplogin_script);
            rightcallback(rightlogin_script);
        }
    });
}
else {
    topcallback(toplogin_script);
    rightcallback(rightlogin_script);
}

$('body').on("click", ".login",
    function () {
        if (document.querySelector("div#mask") === null) {
            var titleLogin = '<span class="active" onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_login.html' + (nightMode ? '?night=1' : "") + '\');">登录</span><span onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_register.html' + (nightMode ? '?night=1' : "") + '\')">注册</span>';
            popWin.showWin("400", "620", titleLogin, "/pages/vue_login.html" + (nightMode ? '?night=1' : ""));
        }
    });
$('body').on("click", ".register",
    function () {
        if (document.querySelector("div#mask") === null) {
            var titleLogin = '<span onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_login.html' + (nightMode ? '?night=1' : "") + '\');">登录</span><span class="active" onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_register.html' + (nightMode ? '?night=1' : "") + '\')">注册</span>';
            popWin.showWin("400", "620", titleLogin, "/pages/vue_register.html" + (nightMode ? '?night=1' : ""));
        }
    });
$('body').on("click",
    "#btnLogout",
    function () {
        $.ajax({
            type: 'POST',
            url: '/api/loginOut',
            success: function (res) {
                console.log(res)
                window.localStorage.removeItem("username")
                window.localStorage.removeItem("id")
                location.reload()
            },
            error: function (err) {
                console.log(err)
                location.reload()
            }
        });
    }
);

/*$(".search button").click(function () {
    //debugger;
    var q = $.trim($(".search input").val());
    if (q != null && q.length > 0) {
        var needAdd = true;
        var searchHistory = $.cookie("searchHistory");
        if (searchHistory) {
            var sh = searchHistory.split('|');
            for (var i = 0; i < sh.length; i++) {
                var word = sh[i];
                if (word === q) {
                    needAdd = false;
                    break;
                }
            }
        }
        if (needAdd) {
            q = q.replace("|", " ");
            if (searchHistory) {
                searchHistory = q + "|" + searchHistory;
            } else {
                searchHistory = q;
            }
            $.cookie("searchHistory", searchHistory, { domain: 'ithome.com', path: '/' });
        }
        location.href = "//dyn.ithome.com/search/adt_all_" + q + "_0.html";
    }
});
$(".search input").keydown(function (event) {
    if (event.keyCode === 13) {
        $(".search button").click();
    }
});*/


$(".refresh a").on({
    click: function () {
        location.reload();
    }
});


function switchTop() {
    var top = $("#top");
    if (top.offset().top > 50) {
        top.addClass("su");
    } else {
        top.removeClass("su");
    }
}

$(window).scroll(function () {
    switchTop();
});

$(function () {
    switchTop();
});


/* 侧边浮动内容 */
lastScrollY = 0;

function gotop() {
    var diffY;
    if (document.documentElement && document.documentElement.scrollTop)
        diffY = document.documentElement.scrollTop;
    else if (document.body)
        diffY = document.body.scrollTop;
    else {
        /*Netscape stuff*/
    }
    percent = .1 * (diffY - lastScrollY);
    if (percent > 0) percent = Math.ceil(percent);
    else percent = Math.floor(percent);
    lastScrollY = lastScrollY + percent;

    if (lastScrollY < 100) {
        $("#gotop").fadeOut('fast');
    } else {
        $("#gotop").fadeIn('fast');
    }
}
gotopcode = " \
	<div id=\"side_func\"> \
		<a class=\"sfa app\" href=\"https://oursparkspace.cn/\" target=\"_blank\" >火花空间</a> \
      <a class=\"sfa sideweixin\" href=\"https://oursparkspace.cn/\" target=\"_blank\" >手机版</a> \
      <!--<a class=\"sfa tougao\" href=\"/pages/feedback.html\" target=\"_blank\" >反馈</a>--> \
		<a class=\"sfa comment\" id=\"gocomm\" href=\"#ifcomment\" onclick=\"javascript:goanswer();\">回复</a> \
	<a class=\"sfa gotop\" id=\"gotop\" href=\"javascript:;\" title=\"顶部\" onfocus=\"this.blur()\" style=\"display:none\">顶部</span></a> \
     <div class=\"papp\"><img src=\"/img/oursparkspace.png\"  style=\"width:168px;height:192px;\"></div>\
     <div class=\"pweixin\"><img src=\"/img/mindex.png\" style=\"width:168px;height:192px;\"></div>\
	</div>"

document.write(gotopcode);
$('#side_func').prependTo('body');
window.setInterval("gotop()", 500);
$('#side_func a.lapin').hover(
    function () {
        $(this).find('span.text1').css({
            'display': 'none'
        });
        $(this).find('span.text2').css({
            'display': 'block'
        });
    },
    function () {
        $(this).find('span.text2').css({
            'display': 'none'
        });
        $(this).find('span.text1').css({
            'display': 'block'
        });
    }
);
$('#side_func a.app,#side_func .papp').hover(
    function () {
        $(".papp").show();
    },
    function () {
        $(".papp").hide();
    }
);
$('#side_func a.sideweixin,#side_func .pweixin').hover(
    function () {
        $(".pweixin").show();
    },
    function () {
        $(".pweixin").hide();
    }
);

$('#side_func .papp').hover(
    function () {
        $(".papp").show();
    },
    function () {
        $(".papp").hide();
    }
);

$("#gotop").click(function () {
    $("html,body").animate({
        scrollTop: 0
    }, 200);
    return false;
});

$('#gocomm,.pti_comm').click(function () {
    var href = $(this).attr("href");
    var pos = $(href).offset().top - 35;
    $("html,body").animate({
        scrollTop: pos
    }, 200);
    return false;
});


$('.related_post a').hover(function () {
        $(this).parent().find('span').addClass('rp_span');
    },
    function () {
        $(this).parent().find('span').removeClass('rp_span');
    });

setInterval(function () {
    var con = $("#nav").find(".b");
    var as = con.find("a");

    if (as.length > 2) {
        $(as[0]).animate({
                marginTop: "-28px"
            },
            300,
            "swing",
            function () {
                $(as[0]).remove();
                $(as[0]).css("margin-top", "0px");
                //$(as[0]).show();
                con.append(as[0]);
            });
    }
}, 3000);

function ShowMessage(message) {
    var x = window.x || {};
    x.creat = function(t, b, c, d) {
        this.t = t;
        this.b = b;
        this.c = c;
        this.d = d;
        this.op = 1;
        this.div = document.createElement("div");
        this.div.style.height = "50px";
        this.div.style.width = "300px";
        this.div.style.background = "#F4204E";
        this.div.style.position = "fixed";
        this.div.style.left = "50%";
        this.div.style.marginLeft = "-100px";
        this.div.style.marginTop = "-50px";
        this.div.innerText = message;
        this.div.style.fontSize = "12px";
        this.div.style.lineHeight = this.div.style.height;
        this.div.style.textAlign = "center";
        this.div.style.fontWeight = "bold";
        this.div.style.color = "#fff";
        this.div.style.zIndex = "1000";
        this.div.style.top = "calc(50vh - 25px)"
        //this.div.style.top = "500px";
        document.body.appendChild(this.div);
        this.run();
    }
    x.creat.prototype = {
        run: function() {
            var me = this;
            this.t++;
            this.q = setTimeout(function() { me.run() }, 25)
            if (this.t == this.d) {
                clearTimeout(me.q);
                setTimeout(function() { me.alpha(); }, 1500);
            }
        },
        alpha: function() {
            var me = this;
            if ("\v" == "v") {
                this.div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.op * 100 + ")";
                this.div.style.filter = "alpha(opacity=" + this.op * 100 + ")";
            } else {
                this.div.style.opacity = this.op
            }
            this.op -= 0.02;
            this.w = setTimeout(function() { me.alpha() }, 25)
            if (this.op <= 0) {
                clearTimeout(this.w);
                document.body.removeChild(me.div);
            }
        }
    }
    new x.creat(1, 50, 25, 30);
}