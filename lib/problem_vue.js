import API from "../vue/api/api.js";

vm = new Vue({
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
      <div class="Skeleton Skeleton--text" style="width:60%">&nbsp;</div>',
      uploadTest: false,
      fileList: [],
      uploadUrl: api_uploadFileForTest,
      formData: {
        qid: problem_id,
        id: user_id
      }
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
  },
  methods:{
    submitUpload(){
      this.$refs.uploadFile.submit();
    },
    handleExceed(files, fileList) {
      console.log("test")
      this.$message.warning({
        message:`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        duration: 300000000
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ?`)
    },
    successUpload(res){
      this.$notify({
        title: '提交成功!',
        message: '请等待评测完成...',
        type: 'success'
      })
    }
  }
})