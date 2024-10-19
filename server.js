const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL 연결 설정
const db = require('./db/db.js');
const { error } = require('console');

//라우터
/*
app.use('/mainPage', mainPage);
*/
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.render('index');
});

app.post('/login', (req, res) => {
    const {userID, password} = req.body;
    db.query('select * from user where userID = ? AND userPassword = ?',[userID, password], (error, result) => {
        if (error) return console.log(error, 'check');
        if (result.length > 0){
            res.json({ success: true, message: 'Success'});
        } else {
            res.json({ success: false, message: 'Invalid username or password'});
        }
    });
})

app.get('/main', (req, res) =>{
    res.render('./page/main.html');
});

app.get('/main/getData', (req, res) => {
    db.query('select ID, day, title, img from ani', (error, result) =>{
        if (error) return console.log(error, 'check');
        const aniData = result;
        res.json({ aniData })
    });
});

app.get('/info', (req, res) => {
    res.render('./page/info.html');
})

app.post('/info/getData', (req, res) => {
    const {aniID} = req.body;
    db.query('select * from ani where ID = ?', [aniID], (error, result) =>{
        if (error) return console.log(error, 'check');
        const aniData = result;
        res.json({ aniData })
    });
});

app.get('/genre', (req, res) => {
    res.render('./page/genreMenu.html');
})

app.get('/genre/page', (req, res) => {
    res.render('./page/genre.html');
})

app.post('/genre/page/getData', (req, res) => {
    const {genreName} = req.body;
    db.query('select ID, title, img from ani where genre like ?', ['%'+genreName+'%'], (error, result) =>{
        if (error) return console.log(error, 'check');
        const aniData = result;
        res.json({ aniData })
    });
});

app.post('/reco/getData', (req, res) => {
    const {rannum} = req.body;
    db.query('select ID, title, img, nearTime, genre from ani where ID IN(?)', [rannum], (error, result) =>{
        if (error) return console.log(error, 'check');
        const aniData = result;
        res.json({ aniData })
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
