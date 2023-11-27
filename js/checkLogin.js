var loggedIn = document.getElementById("loggedIn")

var getCookie = function(name) {
    var findID = name;
    var value = document.cookie.match('(^|;) ?' + findID + '=([^;]*)(;|$)');
    return value? value[2] : null;
}
var deleteCookie = function(){
    var key = "loggedIn";
    var val = getCookie("loggedIn");

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    cookie += " max-age=-1";
    document.cookie = cookie;
}
var refreshCookie = function(){
    var key = "loggedIn";
    var val = getCookie("loggedIn");

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    cookie += " max-age=360";
    document.cookie = cookie;
}

function checkLoggedIn(){
    if(confirm("로그인 유효 시간이 지났습니다.\n로그인을 유지하시겠습니까?") != true){
        deleteCookie();
        location.href='login.html';
    } else {
        refreshCookie();
    }
}

//로그인/로그아웃 리스너
loggedIn.addEventListener('click', (e) =>{
    deleteCookie();
    location.href='login.html'
})

//로그인 없이의 접근 차단
window.addEventListener('load', function() {
    if(getCookie("loggedIn") == null){
        this.alert("로그인해주세요!");
        this.location.href='login.html';
    }
})

//쿠키의 max-age 값보다 적은 수치로 1000당 1초
setInterval(checkLoggedIn, 600000);