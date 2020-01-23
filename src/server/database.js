const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'battuta.cole6w4w7clq.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: '1qaz!QAZ',
  database: 'battutardb'
});

module.exports = pool.promise();
