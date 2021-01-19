// register globally
import {
  validUsername,
  validNumber,
  isExternal
} from "../vue/utils/validate.js";
import API from "../vue/api/api.js";

Vue.component('svg-icon', {
  name: 'SvgIcon',
  template: '<div><div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" /><svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners"><use :xlink:href="iconName" /></svg></div>',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
})

var Main = {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("用户名不能为空"));
      } else if (!isNaN(parseInt(value.substring(0, 1)))) {
        callback(new Error("用户名不能以数字开头"));
      } else {
        callback();
      }
    };
    const validateNumber = (rule, value, callback) => {
      if (value.length != 10 || !validNumber(value)) {
        callback(new Error("学号错误"));
      } else {
        callback();
      }
    };
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
      loginForm: {
        username: "",
        password: "",
        password2: "",
        number: "",
      },
      loginRules: {
        username: [{
          required: true,
          trigger: "blur",
          validator: validateUsername
        }, ],
        password: [{
          required: true,
          trigger: "blur",
          validator: validatePassword
        }, ],
        password2: [{
          required: true,
          trigger: "blur",
          validator: validatePassword2
        }, ],
        number: [{
          required: true,
          trigger: "blur",
          validator: validateNumber
        }, ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      isMSEdge: "none",
      loading: false,
      params: "",
      nav_link: nav_link
    };
  },
  created() {
    if (location.search.indexOf("night=1") > 0) {
      document.documentElement.setAttribute("class", "dark");
    } else if (location.search.indexOf("night=0") > 0) {
      document.documentElement.setAttribute("class", "light");
    }
    this.params = location.search
    var ua = navigator.userAgent;
    if (
      ua.indexOf("Edge") === -1 &&
      ua.indexOf("Edg") === -1 &&
      ua.indexOf("Trident") === -1
    ) {
      this.isMSEdge = "";
    }
  },
  mounted() {
    if (this.loginForm.number === "") {
      this.$refs.number.focus();
    } else if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    checkCapslock(e) {
      const {
        key,
        shiftKey
      } = e;
      if (key.length === 1) {
        this.capsTooltip =
          key &&
          ((key >= "A" && key <= "Z" && !shiftKey) ||
            (key >= "a" && key <= "z" && shiftKey));
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      var id = document.getElementById("number").value;
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      if (id.length != 10 || !validNumber(id)) {
        this.$message({
          message: "学号有误！",
          center: true,
          type: "error",
        });
      } else if (username === "" || username === null) {
        this.$message({
          message: "用户名不能为空",
          center: true,
          type: "error",
        });
      } else if (!isNaN(parseInt(username.substring(0, 1)))) {
        this.$message({
          message: "用户名不能以数字开头",
          center: true,
          type: "error",
        });
      } else if (password.length < 8 || password.length > 20) {
        this.$message({
          message: "请输入8~20位的账户密码",
          center: true,
          type: "error",
        });
      } else {
        this.loading = true;
        API.register({
            id,
            username,
            password
          })
          .then((res) => {
            this.loading = false;
            this.$message({
              message: "注册成功！页面即将刷新",
              center: true,
              type: "success",
              duration: 750,
              onClose: () => {
                if (window.self !== window.top) {
                  window.parent.location.reload();
                } else {
                  window.location.replace("/login?" + location.search)
                }
              },
            });
          })
          .catch((err) => {
            this.loading = false;
            alert(err.errorMsg || "服务器忙，请稍后重试");
          });
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#register')