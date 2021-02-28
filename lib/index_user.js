import SvgIcon from "../vue/components/SvgIcon.js"
import svg_icon from "./index_icon.js"

document.getElementById("svg-icon").innerHTML = svg_icon
SvgIcon()

Vue.component('status-item',{
  name: 'status-item',
  template: '<div class="status-item"> \
    <div class="con"> \
      <div class="percent-circle percent-circle-left" :style="\'background:\'+color"> \
        <div class="left-content" :style="\'transform:rotate(\'+LeftAngle+\'deg)\'"></div> \
      </div> \
      <div class="percent-circle percent-circle-right" :style="\'background:\'+color"> \
        <div class="right-content" :style="\'transform:rotate(\'+RightAngle+\'deg)\'"></div> \
      </div> \
      <div class="text-circle" style="line-height:var(--name-line-height)">{{value}}%<br>{{name}}</div> \
    </div> \
  </div>',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    RightAngle() {
      return(this.value>50?"180":Math.round(this.value/5*18).toString())
    },
    LeftAngle() {
      return(this.value<50?"0":Math.round((this.value-50)/5*18).toString())
    }
  }
})

Vue.component('function-item',{
  name: 'function-item',
  template: '<a :href="url"><div :class="icon==\'usercenter\'?\'function-item2\':\'function-item\'"> \
    <div v-if="icon==\'usercenter\'" class="item-ico"> \
      <svg-icon :icon-class="icon"/> \
    </div> \
    <div v-else class="item-icon">{{value}}</div> \
    <div>{{name}}</div> \
  </div></a>',
  props: {
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }
})

var vm = new Vue({
  el: "#user-nav",
  data() {
    return {
      status_list: [{
        name: "学习进度",
        value: 0,
        color: "#FF6F61"
      }, {
        name: "练习进度",
        value: 0,
        color: "#0F4C81"
      }],
      function_list: [{
        name: "学习",
        icon: "learn",
        function: [{
          name: "学习时长",
          icon: "time",
          value: '0h',
          url: '/user#learn'
        }]
      },{
        name: "讨论",
        icon: "discuss",
        function: [{
          name: "发起讨论",
          icon: "asking",
          value: '0',
          url: '/user#discussion'
        },{
          name: "参与讨论",
          icon: "discussion",
          value: '0',
          url: '/user#discussion'
        },{
          name: "获得点赞",
          icon: "like",
          value: '0',
          url: '/user#discussion'
        }]
      },{
        name: "练习",
        icon: "practice",
        function: [{
          name: "练习数量",
          icon: "exercise",
          value: '0',
          url: '/user#exercise'
        },{
          name: "代码总量",
          icon: "code",
          value: '0L',
          url: '/user#exercise'
        },{
          name: "通过率",
          icon: "ac",
          value: '0',
          url: '/user#exercise'
        }]
      },{
        name: "用户",
        icon: "user",
        function: [{
          name: "用户中心",
          icon: "usercenter",
          url: '/user'
        }]
      }]
    }
  }
})