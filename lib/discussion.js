var toolbar = ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'color', 'mark', '|', 'blockquote', 'code', '|', 'link', 'image', 'emoji'];
var placeholder = "在此输入以参与讨论"
var partition = ""
var guestid = ""
var comment_count = 0
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
        return ("昨天" + (e.getHours()<10?"0":"") + e.getHours() + ':' + (e.getMinutes()<10?"0":"") + e.getMinutes())
    }
    else{
        return (e.getFullYear() + '/' + (e.getMonth()+1) + '/' + e.getDate() + ' ' + (e.getHours()<10?"0":"") + e.getHours() + ':' + (e.getMinutes()<10?"0":"") + e.getMinutes())
    }
}
$.ajax({
    type: 'POST',
    url: '/api/printList',
    data: {
        choice: "discuss"
    },
    success: function (res) {
        const con_re = new RegExp("<.+?>","g");
        if(res.successFlag === "Y"){
            for (var i=0;i<res.msg.length;i++){
                if(res.msg[i].serial === discussion_id){
                    document.title = res.msg[i].title + " - 讨论 - 代码分析平台"
                    $(".post_page .wrap .t_title>h1").html("["+res.msg[i].partition+"] "+res.msg[i].title)
                    $(".post_page .wrap #PostTitle .t_info .fl .postauthor").html(res.msg[i].guestid)
                    $(".post_page .wrap #PostTitle .t_info div .posandtime").html(time_change(new Date(res.msg[i].time)))
                    $(".post_page .wrap #content .postcontent").html(res.msg[i].content)
                    $("#owner-identity").html("<span>" + (res.msg[i].identity || "同学") + "</span>")
                    partition = res.msg[i].partition
                    guestid = res.msg[i].guestid
                    $.ajax({
                        type: 'POST',
                        url: '/api/getReplyorComment',
                        data: {
                            choice: "comment",
                            partition: partition,
                            formerserial: discussion_id
                        },
                        success: function (result) {
                            if(result.successFlag === "Y"&&result.msg.length>0){
                                var comment = ""
                                comment_count = result.msg.length
                                $("#ReplyList .comm_title .l").html(result.msg.length + " 个回复")
                                for (var i=0;i<result.msg.length;i++){
                                    comment += '<li class="commt_entry"><div class="comm_con"><a><div class="t_head"></div></a><div class="level">'
                                    comment += (res.msg[i].identity || "同学") + '</div>'
                                    comment += '<div class="u_info"><div class="fl"><a class="nickname">'
                                    comment += result.msg[i].guestid
                                    comment += '</a>' + (result.msg[i].guestid == guestid ? '<span class="mf">发帖人</span>' : '')
                                    comment += '<span class="floor">'
                                    comment += (i + 2)
                                    comment += '楼</span></div><div><span class="posandtime">'
                                    comment += time_change(new Date(result.msg[i].time))
                                    comment += '</span></div></div>'
                                    comment += '<div class="u_comment">'
                                    comment += result.msg[i].content
                                    comment += '</div><!--<div class="vote">'
                                    comment += '<div class="up"><a id="agree0a5ae146b8dfb9e5" href="javascript:replyVote(\'0a5ae146b8dfb9e5\',1)">有用 0</a></div>'
                                    comment += '<div class="down"><a id="against0a5ae146b8dfb9e5" href="javascript:replyVote(\'0a5ae146b8dfb9e5\',2)">没用 0</a></div>'
                                    comment += '</div><div class="editcontrol"><a class="goanswer reply_btn">回复</a></div>-->'
                                    comment += '</div></li>'
                                }
                                $("#ulcommentlist>div").html(comment)
                                document.querySelectorAll('pre code').forEach((block) => {
                                    hljs.highlightBlock(block);
                                });
                            }
                            else if(result.successFlag !== "Y"){
                                ShowMessage("讨论内容获取失败，请稍后重试")
                            }
                        },
                        error: function(err){
                            ShowMessage("网络开小差了")
                        }
                    });
                    break;
                }
                /*list_html += res.msg[i].partition
                list_html += res.msg[i].serial
                list_html += res.msg[i].title
                list_html += res.msg[i].guestid
                list_html += res.msg[i].content.replace(con_re,'').substring(0,30)
                list_html += res.msg[i].numof
                list_html += "</ul>"*/
            }
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        }
        else{
            ShowMessage("正文获取失败，请稍后重试")
        }
    },
    error: function(err){
        ShowMessage("网络开小差了")
    }
});
$('body').on("click", ".goanswer",
    function () {
        if (window.localStorage.getItem("id") !== null && window.localStorage.getItem("id") !== undefined) {
            if(document.querySelector("section#simditor-richtext") === null){
                $("#divanswer").html('<section id="simditor-richtext"><textarea id="txt-content" style="display:none" data-autosave="editor-content" required><p></p></textarea></section>')
                $("#divanswer").append('<a href="javascript:;" class="answer_inpt" id="btnReply">回复</a>')
                $("#divanswer").removeClass('hide')
                $("body").append('<script id="reply-simditor" type="text/javascript" src="/lib/simditor_loading.js"></script>')
            }
            setTimeout("location.replace('#divanswer');",50)
        }
        else if (document.querySelector("div#mask") === null) {
            var titleLogin = '<span class="active" onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_login.html' + (nightMode ? '?night=1' : "") + '\');">登录</span><span onclick="$(this).addClass(\'active\').siblings().removeClass(\'active\');$(\'#maskTop iframe\').attr(\'src\',\'/pages/vue_register.html' + (nightMode ? '?night=1' : "") + '\')">注册</span>';
            popWin.showWin("400", "620", titleLogin, "/pages/vue_login.html" + (nightMode ? '?night=1' : ""));
        }
    });
$('body').on("click", "#btnReply",
    function () {
        var value = editor.getValue()
        if(value === undefined || value === null || value === ''){
            ShowMessage("输入不能为空")
        }
        else{
            $.ajax({
                type: 'POST',
                url: '/api/submitComment',
                data: {
                    content: value,
                    partition: partition,
                    formerserial: discussion_id,
                    guestid: window.localStorage.getItem("id"),
                    identity: window.localStorage.getItem("identity") || '同学'
                },
                success: function (res) {
                    if(res.successFlag === "Y"){
                        comment_count++;
                        $("#ReplyList .comm_title .l").html(comment_count + " 个回复")
                        var comment = '<li class="commt_entry"><div class="comm_con"><a><div class="t_head"></div></a><div class="level">'
                        comment += (window.localStorage.getItem("identity") || '同学') + '</div>'
                        comment += '<div class="u_info"><div class="fl"><a class="nickname">'
                        comment += window.localStorage.getItem("id")
                        comment += '</a>' + (window.localStorage.getItem("id") === guestid ? '<span class="mf">发帖人</span>' : '')
                        comment += '<span class="floor">'
                        comment += (comment_count + 1)
                        comment += '楼</span></div><div><span class="posandtime">'
                        comment += time_change(new Date())
                        comment += '</span></div></div>'
                        comment += '<div class="u_comment">'
                        comment += value
                        comment += '</div><!--<div class="vote">'
                        comment += '<div class="up"><a id="agree0a5ae146b8dfb9e5" href="javascript:replyVote(\'0a5ae146b8dfb9e5\',1)">有用 0</a></div>'
                        comment += '<div class="down"><a id="against0a5ae146b8dfb9e5" href="javascript:replyVote(\'0a5ae146b8dfb9e5\',2)">没用 0</a></div>'
                        comment += '</div><div class="editcontrol"><a class="goanswer reply_btn">回复</a></div>-->'
                        comment += '</div></li>'
                        console.log(comment)
                        $("#ulcommentlist>div").append(comment)
                        document.querySelectorAll('pre code').forEach((block) => {
                            hljs.highlightBlock(block);
                        });
                        editor.destroy()
                        var address = window.location.pathname + "/autosave/editor-content/"
                        console.log(address)
                        console.log(window.localStorage.getItem(address))
                        window.localStorage.removeItem(address)
                        $("#divanswer").html('')
                        $("#divanswer").addClass('hide')
                        $("#reply-simditor").remove()
                        ShowMessage("回复成功")
                    }
                    else{
                        ShowMessage(errorMsg||"网络开小差了")
                    }
                },
                error: function(err){
                    ShowMessage("网络开小差了")
                }
            });
        }
    });

