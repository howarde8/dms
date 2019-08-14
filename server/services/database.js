const mysql = require("mysql");
const moment = require("moment");
const bcrypt = require("bcryptjs");
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
let db = new Database({
  host: keys.mysql.host,
  user: keys.mysql.user,
  password: keys.mysql.password,
  database: keys.mysql.database
});
setInterval(() => {
  // Retry if not connected
  if (db.connection.state === "disconnected") {
    db = new Database({
      host: keys.mysql.host,
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
      .then(() => {
        logger.info("[DB] Mysql timezone set");
        initDatabase(db);
      })
      .catch(err => {
        logger.error(`[DB] Connecting mysql fail, retry...: ${err}`);
      });
    db.connection.on("error", err => {
      logger.error(`[DB] On error: ${err}`);
    })
  }
}, 3000);

// TODO: moment(rows[0].timestamp).format("YYYY/MM/DD HH:mm:ss")
// TODO: conversion reminder

const initDatabase = async db => {
  try {
    // Initial level
    await db.query(
      "CREATE TABLE IF NOT EXISTS level (name VARCHAR(64) PRIMARY KEY)"
    );
    await db.query("INSERT IGNORE INTO level (name) values ('ADMIN')");
    await db.query("INSERT IGNORE INTO level (name) values ('DEFAULT')");

    // Initial user
    await db.query(
      "CREATE TABLE IF NOT EXISTS user (" +
        "username VARCHAR(20) PRIMARY KEY, " +
        "password VARCHAR(256) NOT NULL, " +
        "name VARCHAR(256) NOT NULL, " +
        "level VARCHAR(64) NOT NULL, " +
        "email VARCHAR(256), " +
        "FOREIGN KEY (level) REFERENCES level(name) ON UPDATE CASCADE" +
        ")"
    );
    // Check if any admin exists, create one if no one exists
    const adminCount = await db.query(
      "SELECT COUNT(*) FROM user WHERE level = 'ADMIN'"
    );
    if (adminCount[0]["COUNT(*)"] === 0) {
      const hash = await bcrypt.hash("admin", 10); // Hash default password "admin"
      await db.query(
        "INSERT INTO user (username, password, name, level) " +
          `values ('admin', '${hash}', 'Administrator', 'ADMIN')`
      );
    }

    // Initial product
    await db.query(
      "CREATE TABLE IF NOT EXISTS product (" +
        "name VARCHAR(256) PRIMARY KEY, " +
        "quantity INT NOT NULL, " +
        "comment VARCHAR(1024)" +
        ")"
    );

    // Initial level_product
    await db.query(
      "CREATE TABLE IF NOT EXISTS level_product (" +
        "level VARCHAR(64) NOT NULL, " +
        "product VARCHAR(256) NOT NULL, " +
        "price DECIMAL(19, 4) NOT NULL, " +
        "PRIMARY KEY (level, product), " +
        "FOREIGN KEY (level) REFERENCES level(name), " +
        "FOREIGN KEY (product) REFERENCES product(name)" +
        ")"
    );

    // Initial purchase_order
    await db.query(
      "CREATE TABLE IF NOT EXISTS purchase_order (" +
        "username VARCHAR(20) NOT NULL, " +
        "number INT NOT NULL, " +
        "timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, " +
        "status VARCHAR(20) NOT NULL, " +
        "level VARCHAR(64) NOT NULL, " +
        "product VARCHAR(256) NOT NULL, " +
        "PRIMARY KEY (username, number), " +
        "FOREIGN KEY (username) REFERENCES user(username), " +
        "FOREIGN KEY (level, product) REFERENCES level_product(level, product)" +
        ")"
    );
  } catch (err) {
    logger.error("[DB] Initial database failed");
  }
};

module.exports = db;
