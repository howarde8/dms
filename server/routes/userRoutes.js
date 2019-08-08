const bcrypt = require("bcryptjs");
const db = require("../services/database");
const requireAuthorize = require("../middlewares/requireAuthorize");
const requireAdmin = requireAuthorize.admin;
const requireRegular = requireAuthorize.regular;
const logger = require("../services/logger");

module.exports = app => {
  app.get("/api/users", requireAdmin, async (req, res) => {
    // Prevent from viewing admin itself, by adding username != ?
    try {
      const result = await db.query(
        "SELECT username, name, level, email FROM user WHERE username != ?",
        req.user.username
      );
      res.send(result);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get("/api/user/:username", requireAdmin, async (req, res) => {
    try {
      const result = await db.query(
        "SELECT username, name, level, email FROM user WHERE username = ?",
        req.params.username
      );
      res.send(result[0]);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get("/api/user", requireRegular, async (req, res) => {
    try {
      const result = await db.query(
        "SELECT username, name, email FROM user WHERE username = ?",
        req.user.username
      );
      res.send(result[0]);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.post("/api/user", requireAdmin, async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.name) {
      res.status(400).send({ error: "Missing username, password or name" });
      return;
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    try {
      await db.query(
        "INSERT INTO user (username, password, name, level, email) " +
          "VALUES (?, ?, ?, ?, ?)",
        req.body.username,
        hash,
        req.body.name,
        req.body.level || "DEFAULT",
        req.body.email
      );
      res.sendStatus(201);
    } catch (err) {
      switch (err.code) {
        case "ER_DUP_ENTRY":
          res.status(400).send({ error: "Username is duplicate" });
          return;
        case "ER_NO_REFERENCED_ROW":
        case "ER_NO_REFERENCED_ROW_2":
          res.status(400).send({ error: "Level hasn't been defined" });
          return;
        default:
          res.sendStatus(500);
          return;
      }
    }
  });

  app.delete("/api/user/:username", requireAdmin, async (req, res) => {
    try {
      // Check if user exists
      const userResult = await db.query(
        "SELECT * FROM user WHERE username = ?",
        req.params.username
      );
      if (userResult.length === 0) {
        res.sendStatus(204); // No Content, user not exists
        return;
      }

      await db.query(
        "DELETE FROM user WHERE username = ?",
        req.params.username
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.put("/api/user/password/:username", requireAdmin, async (req, res) => {
    if (!req.body.password) {
      res.status(400).send({ error: "Missing password" });
      return;
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    try {
      await db.query(
        "UPDATE user SET password = ? WHERE username = ?",
        hash,
        req.params.username
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  });

  app.put("/api/user/info/:username", requireAdmin, async (req, res) => {
    try {
      // Get user info from db first
      const userResult = await db.query(
        "SELECT name, level, email FROM user WHERE username = ?",
        req.params.username
      );

      // Update info
      await db.query(
        "UPDATE user SET name = ?, level = ?, email = ? WHERE username = ?",
        req.body.name ? req.body.name : userResult[0].name,
        req.body.level ? req.body.level : userResult[0].level,
        req.body.email ? req.body.email : userResult[0].email,
        req.params.username
      );
      res.sendStatus(200);
    } catch (err) {
      if (
        err.code === "ER_NO_REFERENCED_ROW" ||
        err.code === "ER_NO_REFERENCED_ROW_2"
      ) {
        res.status(400).send({ error: "Level hasn't been defined" });
        return;
      } else {
        res.sendStatus(500);
        return;
      }
    }
  });

  app.put("/api/user/password", requireRegular, async (req, res) => {
    if (!req.body.currentPassword || !req.body.newPassword) {
      res.status(400).send({ error: "Missing currentPassword or newPassword" });
      return;
    }

    // Check if current password match correct password
    try {
      const correctPasswordHash = await db.query(
        `SELECT password FROM user WHERE username = '${req.user.username}'`
      );
      const match = await bcrypt.compare(
        req.body.currentPassword,
        correctPasswordHash[0].password
      );
      if (!match) {
        res.status(400).send({ error: "Current password incorrect" });
        return;
      }
    } catch (err) {
      res.status(500).send({ error: err });
      return;
    }

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    try {
      await db.query(
        "UPDATE user SET password = ? WHERE username = ?",
        hash,
        req.user.username
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  });

  app.put("/api/user/info", requireRegular, async (req, res) => {
    try {
      // Get user info from db first
      const userResult = await db.query(
        "SELECT name, email FROM user WHERE username = ?",
        req.user.username
      );

      // Update info
      await db.query(
        "UPDATE user SET name = ?, email = ? WHERE username = ?",
        req.body.name ? req.body.name : userResult[0].name,
        req.body.email ? req.body.email : userResult[0].email,
        req.user.username
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  });
};
