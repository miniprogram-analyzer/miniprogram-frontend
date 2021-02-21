import API from "../vue/api/api.js";

var vm = new Vue({
  el: '#feedback',

  data() {
    return {
      uploadUrl: api_uploadPictureToFeedback,
      tags: ['功能异常', '解决方案有误', '新功能建议', '代码评分不准', '其他'],
      ruleForm: {
        tag: '',
        detail: ''
      },
      rules: {
        detail: [{
          max: 1200,
          message: '字数不能超过1200字',
          trigger: 'blur'
        }, {
          min: 10,
          message: '字数不能少于10字',
          trigger: 'blur'
        }, {
          required: true,
          message: '请详细描述问题',
          trigger: 'blur'
        }],
        tag: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }]
      },
      placeholderList: ['说说在使用过程中的不愉快之处', '解决方案出问题了？告诉我们！我们在你身后', '快把想要的功能说出来吧~', '样式很好看，功能完备的页面却打了低分？和我们说吧！', '畅所欲言吧！'],
      feedbackText: '',
      fileList: [],
      filesList: [],
      uploadData: {
        id: user_id
      },
      uploadLoading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.uploadLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          API.submitFeedback({
            id: user_id,
            about: this.ruleForm.tag,
            content: this.ruleForm.detail
          }).then(res => {
            if (res.successFlag === 'Y') {
              //this.$refs.upload.submit()
              if (this.filesList.length > 0) {
                var formdata = new FormData();
                for (var i = 0; i < this.filesList.length; i++) {
                  formdata.append('file', this.filesList[i].raw)
                }
                API.uploadPictureToFeedback(formdata).then(res => {
                  console.log(res)
                })
              }
            }
          }).catch(err => {
            this.$notify({
              title: '反馈失败!',
              message: '请稍后重试',
              type: 'error',
              offset: 60
            })
            this.uploadLoading = false
          })
        } else {
          this.uploadLoading = false
          console.log('系统繁忙，提交失败了')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    labelChange(item) {
      console.log(item)
      switch (item) {
        case '功能异常':
          this.feedbackText = this.placeholderList[0]
          break
        case '解决方案有误':
          this.feedbackText = this.placeholderList[1]
          break
        case '新功能建议':
          this.feedbackText = this.placeholderList[2]
          break
        case '代码评分不准':
          this.feedbackText = this.placeholderList[3]
          break
        case '其他':
          this.feedbackText = this.placeholderList[4]
          break
        default:
          this.feedbackText = this.placeholderList[4]
          break
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning({
        message: `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        offset: 80
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ?`)
    },
    beforeUpload(file) {
      const isAvatar = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isAvatar) {
        this.$message.warning({
          message: '上传图片只能是 JPG/PNG 格式!',
          offset: 80
        });
      }
      if (!isLt2M) {
        this.$message.warning({
          message: '上传图片大小不能超过 2MB!',
          offset: 80
        });
      }
      return isAvatar && isLt2M;
    },
    success(res) {
      /*this.$notify({
        title: '反馈成功!',
        message: '感谢你的反馈！我们将尽快处理~~',
        type: 'success',
        offset: 60
      })*/
    },
    handleFile(file, fileList) {
      this.filesList = fileList
    }
  }
})