const mysql = require("mysql");
const moment = require("moment");
const logger = require("./logger");
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

  query(sql, ...args) {
    return new Promise((resolve, reject) => {
      const formatSql = mysql.format(sql, args);
      logger.debug(`[DB] ${formatSql}`);
      this.connection.query(formatSql, (err, rows) => {
        if (err) {
          logger.error(`[DB] ${err}`);
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
    logger.info(`[DB] Mysql is connected with id ${threadId}`);

    // Set MySQL timezone by finding UTC Offset
    let tzOffset = moment().utcOffset() / 60;
    tzOffset = tzOffset >= 0 ? "+" + tzOffset : tzOffset.toString();
    return db.query(`SET time_zone = '${tzOffset}:00'`);
  })
  .then(() => logger.info("[DB] Mysql timezone set"))
  .catch(err => {
    logger.error(`[DB] Connecting mysql: ${err}`);
  });

// TODO: moment(rows[0].timestamp).format("YYYY/MM/DD HH:mm:ss")
// TODO: conversion reminder

module.exports = db;
