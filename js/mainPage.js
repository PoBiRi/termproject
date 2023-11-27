var sun = document.getElementById('sun-list');
var mon = document.getElementById('mon-list');
var tue = document.getElementById('tue-list');
var wen = document.getElementById('wen-list');
var thu = document.getElementById('thu-list');
var fri = document.getElementById('fri-list');
var sat = document.getElementById('sat-list');
var mql = window.matchMedia("screen and (max-width: 768px");

var setDaySelectedCookie = function(name) {
    var key = "selectedDay";
    var val = name;

    var cookie ="";
    cookie += key + "=" + val + ";";
    cookie += " path=/;"
    document.cookie = cookie;
}
var getSelectedCookie = function(name) {
    var findID = name;
    var value = document.cookie.match('(^|;) ?' + findID + '=([^;]*)(;|$)');
    return value? value[2] : 'sun-list';
}

function reset(type){
    sun.style.display = type;
    mon.style.display = type;
    tue.style.display = type;
    wen.style.display = type;
    thu.style.display = type;
    fri.style.display = type;
    sat.style.display = type;
}

//요일 선택 리스너
function dayClick(day) {
    //데스크탑 환경일 경우 무시
    if(mql.matches != true){return}
    setDaySelectedCookie(day);
    reset('none');
    var day = document.getElementById(day);
    day.style.display = 'block';
}

//창 크기 변경 리스너
mql.addEventListener('change', (e) => {
    if(e.matches) {
        dayClick(getSelectedCookie('selectedDay'));
    } else {
        reset('block');
    }
})