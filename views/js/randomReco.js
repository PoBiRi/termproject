var recoList = document.getElementById('reco-list');

function onlyOne(arr, value) {
    for(let i=0;i<arr.length;i++){
        if(value == arr[i]){return false;}
        else {return value;}
    }
}

//랜덤 추천 섹션
let tmparr = []
for(let i=0;i<5;i++){
    while(true){
        let tmp = Math.floor(Math.random() * 36) + 1
        if(onlyOne(tmparr, tmp)){
            tmparr[i] = tmp;
            break;
        }
    }
}
rannum = [1,2,3,4,5];
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
    })
    .catch(error => console.error('Error:', error));