const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("./config");
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_LOCATION_LOST") {
      console.error("DataBase connection was closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }
  if (connection) {
    connection.release();
  }
  console.log("DB is connected");
  return;
});
pool.query = promisify(pool.query);
module.exports = pool;
