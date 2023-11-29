
const db = require('./db/db.js');

db.query('select * from ani', (error, result) =>{
    if (error) return console.log(error, 'check');
    console.log(result.length);
})