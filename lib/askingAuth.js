const authorizedHandler = function () {
  $('#submit').html('<a href="javascript:;" class="answer_inpt" id="btnSubmit">提交</a>');
}
const unauthorizedHandler = function () {
  loginHandler();
}