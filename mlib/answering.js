$('body').on("click", ".new-post",
    function () {
        if (window.localStorage.getItem("user_id") !== null && window.localStorage.getItem("user_id") !== undefined) {
            window.location.href = "/m/asking"
        } else {
            window.location.href = "/login?source=/m/asking" + (window.localStorage.getItem("LightDarkSet") === "dark" ? "&night=1" : window.localStorage.getItem("LightDarkSet") === "light" ? "&night=0" : "")
        }
    });

$('body').on("click", "#nav a.classify_item",
    function () {
        $('#nav a.classify_item').removeClass("current")
        $(this).addClass("current")
    });

if(location.hash !== undefined && location.hash !== null && location.hash !== ''){
    $('#nav a.classify_item').removeClass("current")
    $('#nav #classify-' + location.hash.substring(1) + '.classify_item').addClass("current")
}