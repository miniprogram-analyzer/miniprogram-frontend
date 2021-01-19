/*$.ajax({
    type: 'POST',
    url: 'http://49.233.55.75:8000/api/printProblem',
    success: function (res) {
        for (var i=0;i<res.msg.length;i++){
            if(res.msg[i].serial === problem_id){
                document.title = (res.msg[i].title || '问题详情') + " - 练习 - 代码分析平台"
                $(".post_page .wrap .t_title>h1").html(res.msg[i].title || '问题详情')
                $(".post_page .wrap #content .postcontent").html(res.msg[i].detail)
                break;
            }
        }
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    },
    error: function(err){
        ShowMessage("网络开小差了")
    }
});*/


import API from "../vue/api/api.js";

var Main = {
  data() {
    return {
      problem: []
    }
  },
  created() {
    API.printProblem({}).then(res => {
      console.log(res)
    })
  }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#Pcontent')