var cookieID = document.getElementById("userID");
var cookiePassword = document.getElementById("password");
const form = document.getElementById("loginForm");

var setCookie = function(userID) {
    var key = "loggedIn";
    var val = userID;

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    cookie += " max-age=300";
    document.cookie = cookie;
}

function login() {
    //테스트 아이디
    if (cookieID.value == "testuser" && cookiePassword.value == "1234"){
        setCookie(cookieID.value);
        location.href='main.html';
    } else {
        alert("wrong user");
    }
}
//submit 버튼 이벤트 리스너 - 엔터 가능
form.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
})