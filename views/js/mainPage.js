//사용시 cookieIO.js 포함할 것
var sun = document.getElementById('sun-list');
var mon = document.getElementById('mon-list');
var tue = document.getElementById('tue-list');
var wen = document.getElementById('wen-list');
var thu = document.getElementById('thu-list');
var fri = document.getElementById('fri-list');
var sat = document.getElementById('sat-list');
var sunCircle = document.getElementById('sun-circle');
var monCircle = document.getElementById('mon-circle');
var tueCircle = document.getElementById('tue-circle');
var wenCircle = document.getElementById('wen-circle');
var thuCircle = document.getElementById('thu-circle');
var friCircle = document.getElementById('fri-circle');
var satCircle = document.getElementById('sat-circle');
var mql = window.matchMedia("screen and (max-width: 768px");
var day = {'sun':sun, 'mon':mon, 'tue':tue, 'wen':wen, 'thu':thu, 'fri':fri, 'sat':sat};

fetch('/main/getData')
    .then(response => response.json())
    .then(data => {
        // 서버에서 받은 데이터를 사용
        const aniData = data.aniData;
        console.log(aniData);

        for(let i=0; i < aniData.length; i++){
            day[aniData[i]['day']].insertAdjacentHTML("beforeend",
                '<a class="datebox-table-content" href="#"'
                + 'onclick="aniClick('+ aniData[i]['ID'] +')">'
                + '<div class="thumbnail-wrapper">'
                + '<img src="'+ aniData[i]['img'] +'">'
                + '</div>'
                + '<div class="title">'+ aniData[i]['title'] +'</div>'
                + '</a>'
            );
        }
    })
    .catch(error => console.error('Error:', error));

function reset(type, color){
    sun.style.display = type;
    mon.style.display = type;
    tue.style.display = type;
    wen.style.display = type;
    thu.style.display = type;
    fri.style.display = type;
    sat.style.display = type;
    sunCircle.style.background = color;
    monCircle.style.background = color;
    tueCircle.style.background = color;
    wenCircle.style.background = color;
    thuCircle.style.background = color;
    friCircle.style.background = color;
    satCircle.style.background = color;
};

//요일 선택 리스너
function dayClick(day) {
    //데스크탑 환경일 경우 무시
    if(mql.matches != true){return}
    setCookie('selectedDay', day);
    reset('none', 'rgb(150, 199, 228)');
    var dayList = document.getElementById(day + '-list');
    dayList.style.display = 'block';
    var dayCircle = document.getElementById(day + '-circle');
    dayCircle.style.background = 'rgb(87, 123, 255)';
};

//애니 클릭 리스너
function aniClick(aniID) {
    location.href = '/info?aniID=' + aniID;
};

//창 크기 변경 리스너
mql.addEventListener('change', (e) => {
    if(e.matches) {
        var tmp = getCookie('selectedDay');
        dayClick(tmp? tmp : 'sun');
    } else {
        reset('block', 'rgb(87, 123, 255)');
    }
});