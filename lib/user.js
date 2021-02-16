import API from "../vue/api/api.js";

var vm = new Vue({
  el: '#user',

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
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
      ruleForm: {
        pass: "",
        checkPass: "",
        originpass: "",
        email: window.localStorage.getItem("email"),
        phone: window.localStorage.getItem("phone"),
        user_id: user_id,
        introduction: "",
        username: username,
      },
      rules: {
        pass: [{
          validator: validatePass,
          trigger: "blur"
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: "blur"
        }],
      },
    };
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
    handleAvatarSuccess(res, file, fileList) {
      if(res.successFlag == "Y"){
        this.$notify({
          title: '上传成功!',
          message: '头像已上传成功',
          type: 'success',
          offset: 60
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
    }
  },
})