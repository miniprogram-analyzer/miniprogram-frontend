import API from "../vue/api/api.js";

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

var vm = new Vue({
  el: '#user',

  data() {
    const validateEmail = (rule, value, callback) => {
      const emailValidator = new RegExp("^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$");
      if (value !== "" && value !== null && value !== undefined && !emailValidator.test(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    }
    const validatePhone = (rule, value, callback) => {
      const phoneValidator = new RegExp("^[1][3-9][0-9]{9}$");
      if (value !== "" && value !== null && value !== undefined && !phoneValidator.test(value)) {
        callback(new Error("请输入正确的电话格式"));
      } else {
        callback();
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8 || value.length > 20) {
        callback(new Error("请输入8~20位的账户密码"));
      } else {
        callback();
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      var password = document.getElementById("password").value;
      if (value != password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      uploadUrl: api_uploadPictureToPerson,
      imageUrl: window.localStorage.getItem("avatar"),
      formData: {
        id: user_id
      },
      unedit: true,
      infoForm: {
        email: window.localStorage.getItem("email"),
        phone: window.localStorage.getItem("phone"),
        user_id: user_id,
        introduction: "",
        username: username,
      },
      navBar: [{
        index: '0',
        icon: 'fad fa-user fa-fw',
        title: '个人信息',
        hash: '#user'
      },/*{
        index: '1',
        icon: 'fad fa-key fa-fw',
        title: '修改密码',
        hash: '#password'
      },{
        index: '2',
        icon: 'fad fa-books fa-fw',
        title: '学习记录',
        hash: '#learn'
      },{
        index: '3',
        icon: 'fad fa-comments fa-fw',
        title: '讨论记录',
        hash: '#discussion'
      },{
        index: '4',
        icon: 'fad fa-file-alt fa-fw',
        title: '练习历史',
        hash: '#exercise'
      },*/{
        index: '5',
        icon: 'fad fa-analytics fa-fw',
        title: '分析历史',
        hash: '#analysis'
      }],
      infoRules: {
        email: [{
          trigger: "blur",
          validator: validateEmail
        }],
        phone: [{
          trigger: "blur",
          validator: validatePhone
        }],
      },
      idx: '0',
      analysisTable: []
    };
  },
  created () {
    const list = ['#user','#password','#learn','#discussion','#exercise','#analysis']
    if(location.hash !== undefined && location.hash !== null && location.hash !== ''){
      var page_idx = list.indexOf(location.hash)
      if(page_idx == -1){page_idx = 0}
      this.idx = this.page_idx = page_idx.toString()
    }
    else {
      this.idx = this.page_idx = '0'
    }
    API.analyze_history().catch(function(res){
      for (var i = 0; i < res.data.length; i++){
        res.data[i].miniprogram_path = res.data[i].miniprogram_path.replace(/\/data\/miniprogram-analyzer\/miniprograms\//,"")
        res.data[i].time = time_change(new Date(res.data[0].time))
      }
      vm.analysisTable = res.data
    })
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.image = resData.files.avatar;
    },
    close() {
      this.imagecropperShow = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file, fileList) {
      if(res.successFlag == "Y"){
        this.$notify({
          title: '上传成功!',
          message: '头像已上传成功, 即将自动刷新',
          type: 'success',
          offset: 60,
          onClose: function(){
            window.location.reload()
          }
        })
      }
      else {
        this.$notify({
          title: '上传失败!',
          message: '头像未上传成功',
          type: 'error',
          offset: 60
        })
      }
    },
    beforeAvatarUpload(file) {
      const isAvatar = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isAvatar) {
        this.$message.warning({
          message: '上传头像图片只能是 JPG/PNG 格式!',
          offset: 80
        });
      }
      if (!isLt2M) {
        this.$message.warning({
          message: '上传头像图片大小不能超过 2MB!',
          offset: 80
        });
      }
      return isAvatar && isLt2M;
    },
    handleSelect (index,indexPath){
      this.idx = index
      location.hash = this.navBar[Number(index)].hash
    },
    edit: function(){
      this.unedit = !this.unedit
    },
    analysisDetail (index, row){
      window.location.href = "/code_detail?report=" + row.report_path.replace(/\/data\/miniprogram-analyzer\/reports\//, "")
    },
    analysisDownload (index, row){
      window.open("/miniprograms/analysis/" + row.miniprogram_path.replace(/\/data\/miniprogram-analyzer\/miniprograms\//, ""))
    }
  },
})