const mysql = require('mysql');

const db = mysql.createConnection({
    host: '211.57.218.219',
    user: 'host',
    password: 'host1234',
    database: 'termproject',
    port:'3306'
});

db.connect((error, result) => {
    if (error) console.log(error);
});

module.exports = db;