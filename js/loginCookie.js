/*var setCookie = function(name) {
    var key = name.value;
    var val = true;

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    cookie += " max-age=300";
    document.cookie = cookie;
}*/

var getCookie = function(name) {
    var findID = name.value;
    var value = document.cookie.match('(^|;) ?' + findID + '=([^;]*)(;|$)');
    return value? value[2] : null;
}