var miniprogramCom=[{name:"视图容器",classify:"view",children:[{name:"cover-image",count:0},{name:"cover-view",count:0},{name:"match-media",count:0},{name:"movable-area",count:0},{name:"movable-view",count:0},{name:"scroll-view",count:0},{name:"swiper",count:0},{name:"swiper-item",count:0},{name:"view",count:0},{name:"recycle-view",count:0,type:"weui",href:"component-plus/recycle-view.html"},{name:"recycle-item",count:0,type:"weui",href:"component-plus/recycle-view.html"},{name:"mp-sticky",count:0,type:"weui",href:"component-plus/sticky.html"},{name:"mp-col",count:0,type:"weui",href:"component-plus/grid.html"},{name:"mp-row",count:0,type:"weui",href:"component-plus/grid.html"}]},{name:"基础内容",classify:"content",children:[{name:"icon",count:0},{name:"progress",count:0},{name:"rich-text",count:0},{name:"text",count:0},{name:"mp-badge",count:0,type:"weui",href:"weui/badge.html"},{name:"mp-gallery",count:0,type:"weui",href:"weui/gallery.html"},{name:"mp-loading",count:0,type:"weui",href:"weui/loading.html"},{name:"mp-icon",count:0,type:"weui",href:"weui/icon.html"},{name:"mp-select-text",count:0,type:"weui",href:"component-plus/select-text.html"}]},{name:"表单组件",classify:"form",children:[{name:"button",count:0},{name:"checkbox",count:0},{name:"checkbox-group",count:0},{name:"editor",count:0},{name:"form",count:0},{name:"input",count:0},{name:"label",count:0},{name:"picker",count:0},{name:"picker-view",count:0},{name:"picker-view-column",count:0},{name:"radio",count:0},{name:"radio-group",count:0},{name:"slider",count:0},{name:"switch",count:0},{name:"textarea",count:0},{name:"mp-form",count:0,type:"weui",href:"weui/form.html"},{name:"mp-form-page",count:0,type:"weui",href:"weui/form-page.html"},{name:"mp-cell",count:0,type:"weui",href:"weui/cell.html"},{name:"mp-cells",count:0,type:"weui",href:"weui/cells.html"},{name:"mp-checkbox",count:0,type:"weui",href:"weui/checkbox-group.html"},{name:"mp-checkbox-group",count:0,type:"weui",href:"weui/checkbox-group.html"},{name:"mp-sildeview",count:0,type:"weui",href:"weui/slideview.html"},{name:"mp-uploader",count:0,type:"weui",href:"weui/uploader.html"},{name:"mp-dialog",count:0,type:"weui",href:"weui/dialog.html"},{name:"mp-msg",count:0,type:"weui",href:"weui/msg.html"},{name:"mp-toptips",count:0,type:"weui",href:"weui/toptips.html"},{name:"mp-halfScreenDialog",count:0,type:"weui",href:"weui/half-screen-dialog.html"},{name:"mp-actionSheet",count:0,type:"weui",href:"weui/actionsheet.html"}]},{name:"导航",classify:"nav",children:[{name:"functional-page-navigator",count:0},{name:"navigator",count:0},{name:"navigation-bar",count:0},{name:"page-meta",count:0},{name:"mp-navigation-bar",count:0,type:"weui",href:"weui/navigation.html"},{name:"mp-tabbar",count:0,type:"weui",href:"weui/tabbar.html"},{name:"mp-searchbar",count:0,type:"weui",href:"weui/search.html"},{name:"mp-tabs",count:0,type:"weui",href:"component-plus/tabs.html"},{name:"mp-vtabs",count:0,type:"weui",href:"component-plus/vtabs.html"},{name:"mp-indexList",count:0,type:"weui",href:"component-plus/index-list.html"}]},{name:"媒体组件",classify:"media",children:[{name:"audio",count:0},{name:"camera",count:0},{name:"image",count:0},{name:"live-player",count:0},{name:"live-pusher",count:0},{name:"video",count:0},{name:"voip-room",count:0},{name:"mp-emoji",count:0,type:"weui",href:"component-plus/emoji.html"},{name:"mp-video-swiper",count:0,type:"weui",href:"component-plus/video-swiper.html"},{name:"barrage",count:0,type:"weui",href:"component-plus/barrage.html"}]},{name:"地图",classify:"map",children:[{name:"map",count:0}]},{name:"画布",classify:"canvas",children:[{name:"canvas",count:0},{name:"wxml-to-canvas",count:0,type:"weui",href:"component-plus/wxml-to-canvas.html"}]},{name:"扩展组件",classify:"open",children:[{name:"web-view",count:0},{name:"ad",count:0},{name:"ad-custom",count:0},{name:"official-account",count:0},{name:"open-data",count:0}]}];

const classify={"cover-image":0,"cover-view":0,"match-media":0,"movable-area":0,"movable-view":0,"scroll-view":0,swiper:0,"swiper-item":0,view:0,"recycle-view":0,"recycle-item":0,"mp-sticky":0,"mp-col":0,"mp-row":0,icon:1,progress:1,"rich-text":1,text:1,"mp-badge":1,"mp-gallery":1,"mp-loading":1,"mp-icon":1,"mp-select-text":1,button:2,checkbox:2,"checkbox-group":2,editor:2,form:2,input:2,label:2,picker:2,"picker-view":2,"picker-view-column":2,radio:2,"radio-group":2,slider:2,switch:2,textarea:2,"mp-form":2,"mp-form-page":2,"mp-cell":2,"mp-cells":2,"mp-checkbox":2,"mp-checkbox-group":2,"mp-sildeview":2,"mp-uploader":2,"mp-dialog":2,"mp-msg":2,"mp-toptips":2,"mp-halfScreenDialog":2,"mp-actionSheet":2,"functional-page-navigator":3,navigator:3,"navigation-bar":3,"page-meta":3,"mp-navigation-bar":3,"mp-tabbar":3,"mp-searchbar":3,"mp-tabs":3,"mp-vtabs":3,"mp-indexList":3,audio:4,camera:4,image:4,"live-player":4,"live-pusher":4,video:4,"voip-room":4,"mp-emoji":4,"mp-video-swiper":4,barrage:4,map:5,canvas:6,"wxml-to-canvas":6,"web-view":7,ad:7,"ad-custom":7,"official-account":7,"open-data":7};
const wxDomainEx = "https://developers.weixin.qq.com/miniprogram/dev/extended/"

var hasComponent = [false,false,false,false,false,false,false,false]

var jsonResult = null

var load_json = function(result) {
    
    console.log(result)
    var miniprogramPages = "<tbody>"
    for (var i = 0; i < result.pages.length; i++) {
        miniprogramPages = miniprogramPages + "<tr><td>" + (i + 1) + "</td><td><a id=\"" + result.pages[i].replace(/\//g,"-") + "\" data-src=\"" + result.pages[i] + "\">" + result.pages[i] + "</a></td></tr>"
        $('body').on("click", "#"+result.pages[i].replace(/\//g,"-"),
            function () {
                if (document.querySelector("div#mask") === null) {
                    const page = $(this).data("src")
                    for (var j = 0; j < result.plato.length; j++) {
                        if (result.plato[j].info.file.indexOf(page) > 0) {
                            var title = "<div class=\"bb code-detail\"><span style=\"margin:15px 0 0;cursor:auto;border-bottom:2px solid #F4204E;word-break:keep-all;text-overflow:ellipsis;overflow:hidden;max-width:calc(94vw - 100px)\">页面\"" + page + "\"详细信息</span></div>"
                            console.log(result.plato[j])
                            var content = "<div class=\"bb code-detail\" style=\"overflow-y:scroll;height:calc(100vh - 200px)\">"

                            //overall
                            content += "<div class=\"data-table code-table\"><h2 class=\"code-item\"><div class=\"components-icon\" id=\"code-overall\"></div>概览</h2><div class=\"components-list code-list\">"
                            //content += "<div class=\"components-item\">类<div class=\"components-count\">" + result.plato[j].complexity.classes.length + "</div></div>"
                            content += "<div class=\"components-item\">依赖<div class=\"components-count\">" + result.plato[j].complexity.dependencies.length + "</div></div>"
                            content += "<div class=\"components-item\">方法<div class=\"components-count\">" + result.plato[j].complexity.methods.length + "</div></div>"
                            content += "<div class=\"components-item\">可维护性<div class=\"components-count\">" + result.plato[j].complexity.maintainability + "</div></div>"
                            content += "<div class=\"components-item\">行数<div class=\"components-count\">" + (result.plato[j].complexity.lineEnd - result.plato[j].complexity.lineStart + 1) + "</div></div>"
                            content += "</div></div>"

                            let ave = result.plato[j].complexity.methodAverage
                            let agg = result.plato[j].complexity.methodAggregate
                            //time
                            content += "<div class=\"data-table code-table\"><h2 class=\"code-item\"><div class=\"components-icon\" id=\"code-time\"></div>复杂度（平均/总计）</h2><div class=\"components-list code-list\">"
                            content += "<div class=\"components-item\">圈<div class=\"components-count\">" + ave.cyclomatic + " / " + agg.cyclomatic + "</div></div>"
                            content += "<div class=\"components-item\">圈密度<div class=\"components-count\">" + ave.cyclomaticDensity + " / " + agg.cyclomaticDensity + "</div></div>"
                            content += "<div class=\"components-item\">参数<div class=\"components-count\">" + ave.params + " / " + agg.params + "</div></div>"
                            content += "<div class=\"components-item\">sloc-logical<div class=\"components-count\">" + ave.sloc.logical + " / " + agg.sloc.logical + "</div></div>"
                            content += "<div class=\"components-item\">sloc-physical<div class=\"components-count\">" + ave.sloc.physical + " / " + agg.sloc.physical + "</div></div>"
                            content += "<div class=\"components-item\">错误预测<div class=\"components-count\">" + ave.halstead.bugs + " / " + agg.halstead.bugs + "</div></div>"
                            content += "<div class=\"components-item\">难度<div class=\"components-count\">" + ave.halstead.difficulty + " / " + agg.halstead.difficulty + "</div></div>"
                            content += "<div class=\"components-item\">效率<div class=\"components-count\">" + ave.halstead.effort + " / " + agg.halstead.effort + "</div></div>"
                            content += "<div class=\"components-item\">长度<div class=\"components-count\">" + ave.halstead.length + " / " + agg.halstead.length + "</div></div>"
                            content += "<div class=\"components-item\">时间<div class=\"components-count\">" + ave.halstead.time + " / " + agg.halstead.time + "</div></div>"
                            content += "<div class=\"components-item\">词汇表<div class=\"components-count\">" + ave.halstead.vocabulary + " / " + agg.halstead.vocabulary + "</div></div>"
                            content += "<div class=\"components-item\">容量<div class=\"components-count\">" + ave.halstead.volume + " / " + agg.halstead.volume + "</div></div>"
                            content += "<div class=\"components-item\">不同操作数<div class=\"components-count\">" + ave.halstead.operands.distinct + " / " + agg.halstead.operands.distinct + "</div></div>"
                            content += "<div class=\"components-item\">总操作数<div class=\"components-count\">" + ave.halstead.operands.total + " / " + agg.halstead.operands.total + "</div></div>"
                            content += "<div class=\"components-item\">不同操作符<div class=\"components-count\">" + ave.halstead.operands.distinct + " / " + agg.halstead.operands.distinct + "</div></div>"
                            content += "<div class=\"components-item\">总操作符<div class=\"components-count\">" + ave.halstead.operators.total + " / " + agg.halstead.operators.total + "</div></div>"
                            content += "</div></div>"
                            
                            //dependencies
                            if(result.plato[j].complexity.dependencies.length > 0){
                                content += "<div class=\"data-table code-table\"><h2 class=\"code-item\" style=\"border-bottom:none\"><div class=\"components-icon\" id=\"code-dependency\"></div>依赖关系</h2><table class=\"data-table\" id=\"code-dependencies\">"
                                content += "<thead><tr><td class=\"dependency-line\">行</td><td class=\"dependency-type\">类型</td><td class=\"dependency-path\">路径</td></tr></thead>"
                                content += "<tbody>"
                                for (var k = 0; k < result.plato[j].complexity.dependencies.length; k++) {
                                    content += "<tr><td class=\"dependency-line\">" + result.plato[j].complexity.dependencies[k].line + "</td><td class=\"dependency-line\">" + result.plato[j].complexity.dependencies[k].type + "</td><td class=\"dependency-path\">" + result.plato[j].complexity.dependencies[k].path + "</td></tr>"
                                }
                                content += "</tbody></table></div>"
                            }

                            //errors
                            if(result.plato[j].jshint.messages.length > 0){
                                content += "<div class=\"data-table code-table\"><h2 class=\"code-item\" style=\"border-bottom:none\"><div class=\"components-icon\" id=\"code-error\"></div>代码逻辑错误</h2><table class=\"data-table\" id=\"code-errors\">"
                                content += "<thead><tr><td class=\"error-num\">序号</td><td class=\"error-row\">行</td><td class=\"error-col\">列</td><td class=\"error-more\">详细信息</td></tr></thead>"
                                content += "<tbody>"
                                for (var k = 0; k < result.plato[j].jshint.messages.length; k++) {
                                    content += "<tr><td class=\"error-num errtype-" + (result.plato[j].jshint.messages[k].severity == "error"?"error":"warn") + "\">" + (k + 1) + "</td><td class=\"error-row\">" + result.plato[j].jshint.messages[k].line + "</td><td class=\"error-col\">" + result.plato[j].jshint.messages[k].column + "</td><td class=\"error-more\">" + result.plato[j].jshint.messages[k].message + "</td></tr>"
                                }
                                content += "</tbody></table></div>"
                            }
                            content += "</div>"
                            popWin.showDetail(title, content);
                            break;
                        }
                    }
                }
            });
    }
    miniprogramPages += "</tbody>"
    $("#miniprogram-pages").html(miniprogramPages);
    for (let key in result.components) {
        const num = classify[key]
        hasComponent[num] = true
        for (var i=0;i<miniprogramCom[num].children.length;i++){
            if(miniprogramCom[num].children[i].name == key){
                miniprogramCom[num].children[i].count = result.components[key]
                break;
            }
        }
    }
    var miniprogramComponents = ""
    for (var i = 0; i < miniprogramCom.length; i++) {
        miniprogramComponents = miniprogramComponents + "<div class=\"data-table components-table\"><h2 class=\"components\"><div class=\"components-icon\" id=\"components-" + miniprogramCom[i].classify + "\"></div>" + miniprogramCom[i].name + "</h2><div class=\"components-list\">"
        for (var j = 0; j < miniprogramCom[i].children.length; j++) {
            miniprogramComponents = miniprogramComponents + "<div class=\"components-item\"><a target=\"_blank\" href=\"" + (miniprogramCom[i].children[j].type === "weui" ? (wxDomainEx + miniprogramCom[i].children[j].href + "\" class=\"components-extra\">") : "https://developers.weixin.qq.com/miniprogram/dev/component/" + miniprogramCom[i].children[j].name + ".html\">") + miniprogramCom[i].children[j].name + "</a><div class=\"components-count" + (miniprogramCom[i].children[j].count == 0 ? "" : "-hl") + "\">" + miniprogramCom[i].children[j].count + "</div></div>"
        }
        miniprogramComponents = miniprogramComponents + "</div></div>"
    }
    $("#miniprogram-components").removeClass("data-table")
    $("#miniprogram-components").html(miniprogramComponents);
    jsonResult = result
}

const result = window.localStorage.getItem("analysis_current")
if(result !== null && result !== undefined){
    load_json (JSON.parse(result))
}
else {
    $.getJSON("/report/seed/report.json", load_json (result));
}