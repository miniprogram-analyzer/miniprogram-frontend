import API from "../vue/api/api.js";

var vm = new Vue({
  el: '#Pcontent',

  data() {
    return {
      title: "问题详情",
      detail: '<h1>描述</h1> \
      <div class="Skeleton Skeleton--text">&nbsp;</div> \
      <div class="Skeleton Skeleton--text">&nbsp;</div> \
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div> \
      <p></p> \
      <h1>示例</h1> \
      <div class="Skeleton Skeleton--text">&nbsp;</div> \
      <div class="Skeleton Skeleton--text">&nbsp;</div> \
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div> \
      <p></p> \
      <h1>提示</h1> \
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div> \
      <p></p> \
      <h1>格式</h1> \
      <h2>页面命名</h2> \
      <div class="Skeleton Skeleton--text" style="width:50%">&nbsp;</div> \
      <p></p> \
      <h2>元素命名</h2> \
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div> \
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div> \
      <p></p> \
      <h1>要求</h1> \
      <ul> \
          <li><div class="Skeleton Skeleton--text" style="width:50%">&nbsp;</div></li> \
          <li><div class="Skeleton Skeleton--text" style="width:50%">&nbsp;</div></li> \
          <li><div class="Skeleton Skeleton--text" style="width:50%">&nbsp;</div></li> \
      </ul> \
      <h1>文档</h1> \
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div>'
    }
  },
  created() {
    API.getProblem({
      id: problem_id
    }).then(res => {
      vm.title = res.msg[0].title || "问题详情"
      vm.detail = res.msg[0].detail
    })
  },
  updated() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
})