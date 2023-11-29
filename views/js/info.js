var aniTitle = document.getElementsByClassName('entry-title');
var mindesc = document.getElementsByClassName('mindesc');
var aniInfo = document.getElementsByClassName('ani-info');
var genxed = document.getElementsByClassName('genxed');
var aniCnt = document.getElementsByClassName('entry-content');
var aniImg = document.getElementsByClassName('img_full');
var recoList = document.getElementById('reco-list');

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var aniID = getQueryParam('aniID');
var rannum = [];

function onlyOne(value) {
    for(let i=0;i<rannum.length;i++){
        if(rannum[i] == value){return false;}
    }
    return value;
}

for(let i=0;i<5;i++){
    while(true){
        let tmp = Math.floor(Math.random() * 36) + 1
        if(onlyOne(tmp) != false){
            rannum.push(tmp);
            break;
        }
    }
}

fetch('/info/getData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ aniID })
})
    .then(response => response.json())
    .then(data => {
        // 받은 데이터로 화면 구성
        const aniData = data.aniData;
        console.log(aniData);
        // 메인 섹션
        aniTitle[0].insertAdjacentHTML("beforeend", aniData[0]['title']);
        mindesc[0].insertAdjacentHTML("beforeend", aniData[0]['title'] + '의 줄거리 등 다양한 정보를 확인하실 수 있습니다.');
        aniInfo[0].insertAdjacentHTML("beforeend", aniData[0]['showTime']);
        aniInfo[1].insertAdjacentHTML("beforeend", aniData[0]['season']);
        aniInfo[2].insertAdjacentHTML("beforeend", aniData[0]['startTime']);
        aniInfo[3].insertAdjacentHTML("beforeend", aniData[0]['nearTime']);

        var genxedStr = aniData[0]['genre'].split(',');
        for(let i=0;i<genxedStr.length;i++){
            genxed[0].insertAdjacentHTML("beforeend", '<a href="/genre/page?type=' +genxedStr[i]+'" rel="tag">' + genxedStr[i] +'</a>');
        }

        if(aniData[0]['cnt'] == ''){
            aniCnt[0].insertAdjacentHTML("beforeend", '<p>등록된 줄거리가 없습니다.</p>');
        } else {
            aniCnt[0].insertAdjacentHTML("beforeend", '<p>' + aniData[0]['cnt'].replaceAll("\n", "<br>") + '</p>');
        }

        aniImg[0].setAttribute('src', aniData[0]['img']);
    })
    .catch(error => console.error('Error:', error));
    
fetch('/reco/getData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({rannum})
})
    .then(response => response.json())
    .then(data => {
        // 받은 데이터로 화면 구성
        const aniData = data.aniData;
        console.log(aniData);

        for(let i=0;i<aniData.length;i++){
            var genxedStr = aniData[i]['genre'].split(',');
            var genxed = document.getElementsByClassName('reco-genre');

            recoList.insertAdjacentHTML("beforeend", '<li><div class=reco-img>'
            + '<a class=reco href="/info?aniID='+aniData[i]['ID']+'">'
            + '<img src="'+aniData[i]['img']+'"></a></div>' +'<div class="reco-info">'
            + '<h4><a class="reco" href="/info?aniID='+aniData[i]['ID']+'">'
            + aniData[i]['title']+'</a></h4><span class="reco-genre"><b>장르</b>: '
            + '</span><span>'+aniData[i]['nearTime']+'</span></div></li>');

            for(let j=0;j<genxedStr.length;j++){
                genxed[i].insertAdjacentHTML("beforeend", '<a href="/genre/page?type=' +genxedStr[j]+'" rel="tag">' + genxedStr[j] +' </a>');
            }
        }     
    })
    .catch(error => console.error('Error:', error));