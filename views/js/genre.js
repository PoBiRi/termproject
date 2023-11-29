function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var genreName = getQueryParam('type');
var genreType = document.getElementById('genre-type');
var listupd = document.getElementsByClassName('listupd');
var recoList = document.getElementById('reco-list');

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

fetch('/genre/page/getData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ genreName })
})
    .then(response => response.json())
    .then(data => {
        // 받은 데이터로 화면 구성
        const aniData = data.aniData;
        console.log(aniData);

        genreType.insertAdjacentHTML("beforeend", '"' + genreName + '" 장르 목록');

        for(let i=0;i<aniData.length;i++){
            listupd[0].insertAdjacentHTML("beforeend", '<div class="bs">'
                + '<div class="bsx"><a href="/info?aniID=' + aniData[i]['ID'] + '">'
                + '<div class="limit">'
                + '<img src="'+ aniData[i]['img'] +'"></div>'
                + '<div class="tt">" '+ aniData[i]['title'] +' "</div>'
                + '</a></div></div>');
        }
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