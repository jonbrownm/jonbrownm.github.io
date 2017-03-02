$(document).ready(function() {

    cookieName = $(".alert").data("cookie");

	var name = getCookie(cookieName);

    if (name != "") {
        $(".alert[data-cookie='" + cookieName + "']").hide();
    } else {
        $(".alert[data-cookie='" + cookieName + "']").show();
    }

});


$(".alert button").click(function(event) {

    event.preventDefault();

    cname = $(this).parent().attr("data-cookie");
    cvalue = true;
    exdays = 365;

    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    
    $(".alert[data-cookie='" + cname + "']").hide();

});

function getCookie(cname) {

    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    
    return "";
}