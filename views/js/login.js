//사용시 html에 cookieIO.js 포함할 것
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var userID= document.getElementById('userID').value;
    var password = document.getElementById('password').value;

    // 서버로 로그인 데이터를 전송
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID, password })
        console.log(userID);
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            setCookie('loggedIn', true);
            location.href = '/main';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
