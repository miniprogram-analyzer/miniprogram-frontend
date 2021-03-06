var problemHTML = "<thead><tr><td>序号</td><td>题目</td><td>递交</td><td>%&nbsp;AC</td><td>难度</td></tr></thead><tbody>"
for (var i = 0; i < 20; i++) {
  problemHTML += '<tr><td><div class="Skeleton Skeleton--text">&nbsp;</div></td>'
  problemHTML += '<td><div class="Skeleton Skeleton--text" style="width:400px">&nbsp;</div></td>'
  for (var j = 0; j < 3; j++) {
    problemHTML += '<td><div class="Skeleton Skeleton--text">&nbsp;</div></td>'
  }
  problemHTML += '</tr>'
}
problemHTML += "</tbody>"
$("#problems-list").html(problemHTML);
$.ajax({
  type: 'POST',
  url: api_printProblem,
  success: function (res) {
    problemHTML = "<thead><tr><td>序号</td><td>题目</td><td>递交</td><td>%&nbsp;AC</td><td>难度</td></tr></thead><tbody>"
    for (var i = 0; i < res.msg.length; i++) {
      let problem_id = res.msg[i].serial
      problemHTML += "<tr onclick=\"window.open('" + (location.pathname == '/exercising' ? "/problem?id=" : "/m/problem?id=") + problem_id +"')\"><td>P" + problem_id + "</td><td>" + (res.msg[i].title || '问题' + problem_id) + "</td><td>" + (res.msg[i].submit || 0) + "</td><td>" + (res.msg[i].accept || 0) + "</td><td>" + (res.msg[i].difficulty || 0) + "</td></tr>"
    }
    problemHTML += "</tbody>"
    $("#problems-list").html(problemHTML);
  },
});