const simditor_sync = true;
var toolbar = ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'color', 'mark', '|', 'ol', 'ul', 'blockquote', 'code', '|', 'link', 'image', '|', 'indent', 'outdent', 'alignment'];
var vm = new Vue({
  el: "#Qinfo",
  data: {
    ruleForm: {
      question: "",
      classify: "",
      tag: [],
      detail: "",
    },
    rules: {
      question: [
        { required: true, message: '请输入问题描述', trigger: 'blur' },
        { min: 3, max: 40, message: '问题描述不少于 3 个字符', trigger: 'blur' }
      ],
      classify: [
        { required: true, message: '请选择问题分类', trigger: 'change' },
        { required: true, message: '请选择问题分类', trigger: 'blur' }
      ],
      detail: [
        { required: true, message: '请填写问题详细信息', trigger: 'change' }
      ]
    },
    options: [{value:"布局设计",label:"布局设计"},         //wxml
              {value:"样式美化",label:"样式美化"},         //wxss
              {value:"本地功能逻辑",label:"本地功能逻辑"},  //js
              {value:"文件结构",label:"文件结构"},         //framework
              {value:"组件",label:"组件"},                //component
              {value:"API调用",label:"API调用"},          //api
              {value:"云开发",label:"云开发"},            //wxcloud
              {value:"其他",label:"其他"}],               //other
    hasSubmit: false,
    fileList: [],
  }
})

var tip = undefined
var loading = false

$('body').on("click", "#btnSubmit",
  function () {
    const { question, classify } = vm.ruleForm
    const value = editor.getValue()
    var err_msg = undefined
    if (question === undefined || question === null || question === '') {
      err_msg = '请输入问题描述'
    } else if (question.length < 3) {
      err_msg = '问题描述不少于 3 个字符'
    } else if (classify === undefined || classify === null || classify === '') {
      err_msg = '请选择问题分类'
    } else if (value === undefined || value === null || value === '') {
      err_msg = '请填写问题详细信息'
    }
    tip = tip || new Vue({
      el: "#warning-tip",
      data: {
        tip_value: err_msg,
        tip_type: "error"
      },
      methods: {
        closeTip: function () {
          setTimeout(function () {
            tip.$destroy()
            document.getElementById("warning-tip").innerHTML = ""
            tip = undefined
          }, 300)
        }
      }
    })
    tip.tip_value = err_msg || "上传中"
    if (!err_msg) {
      tip.tip_type = "info"
      if (!loading) {
        loading = true
        $.ajax({
          type: 'POST',
          url: api_submitDiscuss,
          data: {
            content: value,
            partition: classify,
            title: question,
            guestid: window.localStorage.getItem("id"),
            identity: window.localStorage.getItem("identity") || '同学'
          },
          success: function (res) {
            if (res.successFlag === "Y") {
              tip.tip_value = "提交成功"
              tip.tip_type = "success"
              setTimeout(function(){
                editor.destroy()
                var address = window.location.pathname + "/autosave/editor-content/"
                address = address.replace(/\/\//,"/")
                window.localStorage.removeItem(address)
                loading = false
                window.location.href = "/answering"
              },500)
            } else {
              tip.tip_value = errorMsg || "网络开小差了"
              tip.tip_type = "error"
            }
          },
          error: function (err) {
            tip.tip_value = "网络开小差了"
            tip.tip_type = "error"
            loading = false
          }
        });
      }
    }
    });