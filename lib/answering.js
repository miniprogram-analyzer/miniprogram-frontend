var page_idx = location.hash
if(page_idx !== null && page_idx !== undefined && page_idx !== '' && page_idx.indexOf('--') != -1){
    page_idx = Number(page_idx.split('--')[1])
}
else {
    page_idx = 1
}
const DISCUSS_PAGE_SIZE = 10

var Skeleton_html = "<ul>"
for (var i = 0; i < DISCUSS_PAGE_SIZE; i++) {
    Skeleton_html += '<li><div class="postimg"><a><div class="t_head"></div></a></div>'
    Skeleton_html += '<div class="title"><div class="t_title"><span class="t_cate">['
    Skeleton_html += '<div class="Skeleton Skeleton--text">&nbsp;</div>'
    Skeleton_html += ']</span>'
    Skeleton_html += '<div class="Skeleton Skeleton--text" style="width:160px">&nbsp;</div>'
    Skeleton_html += '</a></div><div class="t_info"><span>'
    Skeleton_html += '<div class="Skeleton Skeleton--text" style="width:80px">&nbsp;</div>'
    Skeleton_html += '</span><span>'
    Skeleton_html += '<div class="Skeleton Skeleton--text">&nbsp;</div>发表'
    if(location.pathname != '/answering'){
        //移动端
        Skeleton_html += '</span><span class="numb"><img src="/img/like.svg" />'
        Skeleton_html += '<div class="Skeleton Skeleton--text" style="width:20px">&nbsp;</div>'
        Skeleton_html += '</span></div><div class="t_info t_detail">'
        Skeleton_html += '<div class="Skeleton Skeleton--text" style="width:100%">&nbsp;</div>'
        '</div></div></li>'
    }
    else{
        //桌面端
        Skeleton_html += '</span><span>'
        Skeleton_html += '<div class="Skeleton Skeleton--text" style="width:300px">&nbsp;</div>'
        Skeleton_html += '</span><span class="numb"><img src="/img/like.svg" />'
        Skeleton_html += '<div class="Skeleton Skeleton--text" style="width:20px">&nbsp;</div>'
        Skeleton_html += '</span></div></div></li>'
    }
}
Skeleton_html += "</ul>"
$("#discussion_content").html(Skeleton_html);
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
var load_list = function() {
    $.ajax({
        type: 'POST',
        url: api_printList,
        data: {
            choice: "discuss",
            isentire: 0,
            serial: (page_idx - 1) * DISCUSS_PAGE_SIZE + 1,
            size: DISCUSS_PAGE_SIZE,
        },
        success: function (res) {
            const con_re = new RegExp("<.+?>","g");
            if(res.successFlag === "Y"){
                var list_html = "<ul>"
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
        },
        error: function(err){
            console.log(err)
        }
    });
}
load_list();

$('body').on("click", ".new_post",
    function () {
        if (window.localStorage.getItem("user_id") !== null && window.localStorage.getItem("user_id") !== undefined) {
            window.location.href = "/asking"
        }
        else if (document.querySelector("div#mask") === null) {
            loginPopwin();
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
    $('#classify-' + location.hash.split('--')[0].substring(1) + '.classify_item').addClass("current")
}

$.ajax({
    type: 'POST',
    url: api_getListnum,
    data: {
        choice: 'discuss'
    },
    success: function (res) {
        if(res.successFlag === "Y"){
            new Pagination({
                element: '#pagination',
                type: 1,
                pageIndex: page_idx,
                pageSize: DISCUSS_PAGE_SIZE,
                pageCount: 7,
                total: res.length,
                jumper: true,
                singlePageHide: false,
                prevText: '',
                nextText: '',
                disabled: true,
                currentChange: function(index) {
                    $("#discussion_content").html(Skeleton_html);
                    page_idx = index
                    if(location.hash !== null && location.hash !== undefined && location.hash !== ''){
                        location.hash = location.hash.split('--')[0] + '--' + index
                    }
                    else {
                        location.hash = '#all--' + index
                    }
                    load_list();
                }
            });
        }
    },
    error: function(err){
        console.log(err)
    }
});