var $preview, editor, mobileToolbar;
(function () {
    $(function () {
        const worker = new Worker('/utils/simditor/worker.js');
        Simditor.locale = 'zh-CN';
        mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
        if (mobilecheck()) {
            toolbar = mobileToolbar;
        }
        editor = new Simditor({
            textarea: $('#txt-content'),
            placeholder: '',
            toolbar: toolbar,
            toolbarFloatOffset: 40,
            emoji: {
                imagePath: '/utils/simditor/assets/extensions/emoji/images/emoji/'
            },
            pasteImage: true,
            defaultImage: '/utils/simditor/assets/extensions/emoji/images/image.png',
            cleanPaste: true,
            upload: /*location.search === '?upload' ? */ {
                url: (location.pathname == "/asking" ? api_uploadPictureToDiscuss :"")/*'/dev/api/uploadPicture'*/,
            } /*: false*/ ,
            pasteImage: true,
            codeLanguages: [{
                name: 'WXML',
                value: 'html'
            }, {
                name: 'WXSS',
                value: 'css'
            }, {
                name: 'LESS',
                value: 'less'
            }, {
                name: 'JS (JavaScript)',
                value: 'js'
            }, {
                name: 'TS (TypeScript)',
                value: 'ts'
            }, {
                name: 'JSON',
                value: 'json'
            }, {
                name: 'C/C++',
                value: 'c++'
            }]
        });
        $preview = $('#preview');
        if ($preview.length > 0) {
            return editor.on('valuechanged', function (e) {
                return $preview.html(editor.getValue());
            });
        }
        $(editor).blur(function(){
            document.querySelectorAll(
                    '#simditor-richtext .simditor .simditor-wrapper .simditor-body pre'
                )
                .forEach((code) => {
                    worker.onmessage = (event) => {
                        code.innerHTML = event.data;
                    }
                    worker.postMessage(code.textContent);
                });
            if(simditor_sync){
                Vue.set(vm.ruleForm,"detail",editor.getValue())
                if(editor.getValue() == 0 || editor.getValue() == ""){
                    $("section#simditor-richtext .simditor").addClass("is-error");
                }
                else{
                    $("section#simditor-richtext .simditor").removeClass("is-error");
                }
                $("section#simditor-richtext .simditor").removeClass("is-focus");
            }
        });
        $(editor).focus(function(){
            if(simditor_sync){
                $("section#simditor-richtext .simditor").addClass("is-focus");
                $("section#simditor-richtext .simditor").removeClass("is-error");
            }
        });
    });

}).call(this);