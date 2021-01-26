import SvgIcon from "../vue/components/SvgIcon.js"
import svg_icon from "./index_icon.js"

document.getElementById("svg-icon").innerHTML = svg_icon
SvgIcon()

Vue.component('function-welcome', {
  name: 'function-welcome',
  template: '<div class="item-welcome"> \
      <div class="show"><svg-icon :icon-class="icon"/></div> \
      <div class="show">{{name}}</div> \
      <div class="extra">{{detail}}</div> \
    </div>',
  props: {
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    }
  }
})

var vm = new Vue({
  el: "#user-wel",
  data() {
    return {
      fun_list: [{
        name: "记录学习过程",
        icon: "learn",
        detail: "记录学习过程中的各项数据，包括但不限于学习进度、学习时长等信息"
      }, {
        name: "参与讨论互动",
        icon: "discuss",
        detail: "参与到讨论活动过程中，包括但不限于发起讨论。参与讨论回复。点赞等功能"
      }, {
        name: "进行代码练习",
        icon: "practice",
        detail: "使用代码练习与代码分析功能，更好地提供学习帮助"
      }, {
        name: "设置个人选项",
        icon: "user",
        detail: "设定部分个人设置选项"
      }]
    }
  }
})