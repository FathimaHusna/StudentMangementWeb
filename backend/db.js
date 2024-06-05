// db.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studentsdb',
  port: 3309
});

module.exports = db;
