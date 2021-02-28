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
      problem_choice: 1,
      fileList: [],
      uploadUrl: api_uploadFileForTest,
      formData: {
        qid: problem_id,
        id: user_id
      },
      scoreTable: [],
      result_loading: true,
      ave_score: 100,
      total_score: 0,
      status: 'Waiting',
      message: '请等待测评完成...',
      file_path: ''
    }
  },
  created() {
    const list = ['divider','#detail','#upload','divider','#score']
    if(location.hash !== undefined && location.hash !== null && location.hash !== ''){
      var page_idx = list.indexOf(location.hash)
      if(page_idx == -1){page_idx = 1}
      this.problem_choice = page_idx
      $('.sidebar .menu__item:nth-child(1) a').removeClass("active")
      $('.sidebar .menu__item:nth-child('+page_idx+') a').addClass("active")
    }
    else {
      this.problem_choice = 1
    }
    API.getProblem({
      id: problem_id
    }).then(res => {
      vm.title = res.msg[0].title || "问题详情"
      vm.detail = res.msg[0].detail
    }).catch(err => {
      this.$notify({
        title: '加载失败!',
        message: err.errorMsg,
        type: 'error',
        offset: 60,
        duration: 0
      })
    })
    if(this.problem_choice === 4 && this.result_loading){
      this.result_loading = false
      get_result(this.file_path)
    }
    else if(this.problem_choice !== 4){
      this.result_loading = true
    }
  },
  updated() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
    if(this.problem_choice === 4 && this.result_loading){
      this.result_loading = false
      get_result(this.file_path = window.localStorage.getItem('problem_' + problem_id) || '')
    }
    else if(this.problem_choice !== 4){
      this.result_loading = true
    }
  },
  methods:{
    submitUpload(){
      this.$refs.uploadFile.submit();
    },
    handleExceed(files, fileList) {
      this.$message.warning({
        message:`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        offset: 80
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ?`)
    },
    successUpload(res){
      if(res.success = true){
        this.$notify({
          title: '提交成功!',
          message: '请等待评测完成...',
          type: 'success',
          offset: 60
        })
        var file = res.msg.replace(/..\/..\/file\/test\//,'').replace(/.zip/,'')
        this.file_path = file
        window.localStorage.setItem('problem_' + problem_id,file)
      }
      else {
        this.$notify({
          title: '提交失败!',
          message: '请稍后重试',
          type: 'error',
          offset: 60
        })
      }
    },
    handleScoreClass({row, column, rowIndex, columnIndex}){
      if(columnIndex == 0){
        return ('border-' + this.scoreTable[rowIndex].status.toLowerCase())
      }
    }
  }
})

const get_result = function (path) {
  if(path !== undefined && path !== null && path !== ''){
    $.getJSON("/results/result_" + path + ".json", function(result){load_json(result)}).catch(function(err){
      setTimeout(function(){
        get_result(path)
      },5000)
    });
  }
}

const load_json = function (res) {
  if(res.type == 'Compile Error'){
    vm.status = res.type
    vm.message = res.message
  }
  else {
    vm.status = 'Finish'
    vm.message = '测评完成'
    var test_res = []
    vm.ave_score = 100 / res.numTotalTests
    var total_score = 0
    for (var i = 0; i < res.testResults[0].assertionResults.length; i++){
      var testpoint = {
        id: "#" + (i + 1),
        status: res.testResults[0].assertionResults[i].status.charAt(0).toUpperCase() + res.testResults[0].assertionResults[i].status.slice(1),
        score: (res.testResults[0].assertionResults[i].status == 'passed' ? vm.ave_score : 0),
        failureMessages: res.testResults[0].assertionResults[i].failureMessages
      }
      total_score += testpoint.score
      test_res.push(testpoint)
    }
    vm.total_score = total_score > 99 ? 100 : total_score
    vm.scoreTable = test_res
  }
}