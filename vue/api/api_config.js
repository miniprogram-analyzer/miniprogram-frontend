//示例
export default {
  // 登录接口
  login: {
    url: '/api/login', //'http://122.51.210.8:80/api/login',
    method: 'post',
  },
  register: {
    url: '/api/register', //'http://122.51.210.8:80/api/register',
    method: 'post',
  },
  getdebugslist: {
    url: '/api/getList', //'http://122.51.210.8:80/api/getList',
    method: 'post'
  },
  getUserinfo: {
    url: '/api/getUserinfo',
    method: 'post'
  },
  loginOut: {
    url: '/api/loginOut',
    method: 'post'
  },
  getLikestatus: {
    url: '/api/getLikestatus',
    method: 'post'
  },
  getLikenum: {
    url: '/api/getLikenum',
    method: 'post'
  },
  like: {
    url: '/api/like',
    method: 'post'
  },
  questionSubmit: {
    url: '/api/submitQue',
    method: 'post'
  },
  updateList: {
    url: '/api/updateList',
    method: 'post'
  },
  uploadFile: {
    url: '/api/uploadFile',
    method: 'post'
  }
}
