/*$.ajax({
    type: 'POST',
    url: api_printProblem,
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

/*var Main = {
  data() {
    return {
      problem: {},
      detail: null
    }
  },
  created() {
    var id = 3
    API.printProblem({ id }).then(res => {

    }).catch(err => {
      //if (err.successFlag === 'Y') {
        console.log(err.msg[0], '河北')
        this.problem = err.msg[0]
        console.log(this.problem.detail, '加油')
        this.detail = this.problem.detail
      //}
    })
  }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#Pcontent')*/

var vm = new Vue({
  el: '#Pcontent',
  
  data() {
    return {
      problem: {},
      detail: 123
    }
  },
  created() {
    API.getProblem({ id:problem_id }).then(res => {
      console.log(res.msg[0])
      vm.detail = res.msg[0].detail.slice(1,-1)
    })
  }
})