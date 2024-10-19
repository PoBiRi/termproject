const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'pobijunior.com',
    user: 'host',
    password: '1234',
    database: 'termproject',
    port:'3306',
    reconnect: true
});

db.connect((error, result) => {
    if (error) console.log(error);
});

module.exports = db;
