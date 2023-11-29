//사용시 cookieIO.js 포함할 것
var LogoutBtn = document.getElementById('loggedIn');
var mainPageBtn = document.getElementById('menu-item-1');
var randomBtn = document.getElementById('random-icon');

function checkLoggedIn(){
    if(confirm("로그인 유효 시간이 지났습니다.\n로그인을 유지하시겠습니까?") != true){
        deleteCookie('loggedIn');
        location.href='/';
    }else {
        setCookie('loggedIn', true);
    }
};

//로그인/로그아웃 리스너
LogoutBtn.addEventListener('click', (e) =>{
    deleteCookie('loggedIn');
    location.href='/';
});

//로그인 없이의 접근 차단
window.addEventListener('load', function() {
    if(getCookie("loggedIn") == null){
        this.alert("로그인해주세요!");
        this.location.href='/';
    }
})

//요일별 애니 리스너
mainPageBtn.addEventListener('click', (e) =>{
    location.href='/main';
});

//랜덤버튼 리스너 36 = 애니 DB개수
randomBtn.addEventListener('click', (e) =>{
    location.href = '/info?aniID=' + (Math.floor(Math.random() * 36)+1);
});


//쿠키의 max-age 값보다 적은 수치로 1000당 1초
setInterval(checkLoggedIn, 600000);