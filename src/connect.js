let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

let sql = `CALL xxx(?)`;

connection.query(sql, true, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);
});

let config = {
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'mydb'
  };

connection.end();