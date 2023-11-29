var setCookie = function(name, value) {
    var key = name;
    var val = value;

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    /*cookie += " max-age=300";*/
    document.cookie = cookie;
};

var getCookie = function(name) {
    var findID = name;
    var value = document.cookie.match('(^|;) ?' + findID + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

var deleteCookie = function(name, value){
    var key = name;
    var val = getCookie(name);

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    cookie += " max-age=-1";
    document.cookie = cookie;
};