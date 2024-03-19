var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "capstone_2023_personaltrainer",
  password: "3131",
  database: "capstone_2023_personaltrainer",
});

module.exports.pool = pool;