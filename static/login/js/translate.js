//国际化
var formatLang = JSON.parse(sessionStorage.getItem("ANGULAR_PERSISTENCE_STORAGE::lan"));
// console.log(formatLang)
if (formatLang != null) {
    translate(formatLang.data);
} else {
    translate('en');
}
$("#toggle-lan-btn").click(function () {
    $("#toggle-lan-box").toggleClass("hide");
});
$(".lang-btn").click(function () {
    var langBox = $(this).find(".base")
    translate(langBox.data("data"));
    $("#toggle-lan-box").toggleClass("hide");
    var date = new Date().valueOf();
    sessionStorage.setItem("ANGULAR_PERSISTENCE_STORAGE::lan",
        JSON.stringify({ "data": langBox.data("data"), "oneUse": false, "created": date, "lastAccessed": date }));
    switchLan();
})
function translate(lang) {
    if (lang == 'en') {
        $(".v1-f").text('ENGLISH');
        $('.body-g').addClass('lan-en');
        $('.body-g').removeClass('lan-zh');
    } else {
        $(".v1-f").text('中文');
        $('.body-g').addClass('lan-zh');
        $('.body-g').removeClass('lan-en');
    }
    jQuery.i18n.properties({
        name: 'lang',
        path: './static/login/i18n/',
        mode: 'both',
        language: lang,
        async: true,
        callback: function () {
            $(".translate").each(function () {
                var thisDom = $(this);
                var msg = thisDom.data("lang");
                thisDom.html($.i18n.prop(msg));
            });
        }
    });
    $(".lang-btn").removeClass("current");
    $(".lang-btn").each(function () {
        if ($(this).find(".base").data("data") == lang) {
            $(this).addClass("current");
        }
    });
    // jQuery.i18n.prop(")


}