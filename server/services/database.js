const mysql = require("mysql");
const moment = require("moment");

const keys = require("../config/keys");

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect(err => {
        if (err) {
          reject(err);
        } else {
          resolve(this.connection.threadId);
        }
      });
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Connect to MySQL
const db = new Database({
  host: "localhost",
  user: keys.mysql.user,
  password: keys.mysql.password,
  database: keys.mysql.database
});

db.connect()
  .then(threadId => {
    console.log("Mysql is connected with id " + threadId);

    // Set MySQL timezone by finding UTC Offset
    let tzOffset = moment().utcOffset() / 60;
    tzOffset = tzOffset >= 0 ? "+" + tzOffset : tzOffset.toString();
    return db.query(`SET time_zone = '${tzOffset}:00'`);
  })
  .then(() => console.log("Mysql timezone set"))
  .catch(err => {
    console.log("Error when connecting mysql", err);
  });

// TODO: moment(rows[0].timestamp).format("YYYY/MM/DD HH:mm:ss")
// TODO: conversion reminder

module.exports = db;
