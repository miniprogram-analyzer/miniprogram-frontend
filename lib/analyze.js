var analyze_history = JSON.parse(window.localStorage.getItem('analyze_history'))
if(analyze_history !== null && analyze_history !== undefined){
  $('#total-sum').html(analyze_history.length)
}
$.ajax({
  type: 'GET',
  url: api_analyze_history,
  success: function (res) {
    window.localStorage.setItem('analyze_history',JSON.stringify(res.data))
    $('#total-sum').html(res.data.length)
  },
  error: function (err) {
    $('#total-sum').html('获取失败')
  }
});