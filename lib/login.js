// register globally
import API from "../vue/api/api.js";
import SvgIcon from "../vue/components/SvgIcon.js"

SvgIcon()

var Main = {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("用户名/学号不能为空"));
      } else if (
        !isNaN(parseInt(value.substring(0, 1))) &&
        parseInt(value).toString() !== value
      ) {
        callback(new Error("用户名不能以数字开头"));
      } else if (value.length != 10 && parseInt(value).toString() === value) {
        callback(new Error("学号有误！"));
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
    return {
      loginForm: {
        username: "",
        password: "",
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
    var domain_url = location.href.substring(0, location.href.indexOf(location.host) + location.host.length)
    if (location.search.indexOf("source") > 0) {
      if (location.search.indexOf("&night=") > 0) {
        this.oauth_url = domain_url + location.search.substring(
          location.search.indexOf("source") + 7, location.search.indexOf("&night=")
        )
      } else {
        this.oauth_url = domain_url + location.search.substring(
          location.search.indexOf("source") + 7
        )
      }
    } else {
      this.oauth_url = domain_url + '/'
    }
  },
  mounted() {
    if (this.loginForm.username === "") {
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
      var nameOrid = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      if (nameOrid === "" || nameOrid === null) {
        this.$message({
          message: "用户名/学号不能为空",
          center: true,
          type: "error",
        });
      } else if (
        !isNaN(parseInt(nameOrid.substring(0, 1))) &&
        parseInt(nameOrid).toString() !== nameOrid
      ) {
        this.$message({
          message: "用户名不能以数字开头",
          center: true,
          type: "error",
        });
      } else if (
        nameOrid.length != 10 &&
        parseInt(nameOrid).toString() === nameOrid
      ) {
        this.$message({
          message: "学号有误！",
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
        API.login({
            nameOrid,
            password
          })
          .then((res) => {
            this.loading = false;
            if (window.localStorage) {
              var storage = window.localStorage;
              storage.setItem("username", res.data.userInfo.username);
              storage.setItem("user_id", res.data.userInfo.id);
              storage.setItem("identity", res.data.userInfo.identity || "同学");
            }
            this.$message({
              message: "登陆成功！页面即将刷新",
              center: true,
              type: "success",
              duration: 750,
              onClose: () => {
                return_origin()
              },
            });
          })
          .catch((err) => {
            this.loading = false;
            alert(err.errorMsg || "用户名或密码错误");
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
    oursparkspaceLogin(){
      var url = 'https://oauth.proxy.hfzhang.wang/oauth?appid=demo&redirect_uri='+this.oauth_url
      if (window.self !== window.top) {
        window.parent.location.replace(url)
      } else {
        window.location.replace(url)
      }
    }
  },
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#login')