const mysql = require('mysql');

const db = mysql.createConnection({
    host: '220.120.65.148',
    user: 'host',
    password: '1234',
    database: 'termproject',
    port:'3306'
});

db.connect((error, result) => {
    if (error) console.log(error);
});

module.exports = db;
