const bcrypt = require("bcrypt");
const db = require("../services/database");
const requireAuthorize = require("../middlewares/requireAuthorize");
const requireAdmin = requireAuthorize.admin;
const requireRegular = requireAuthorize.regular;

module.exports = app => {
  app.get("/api/users", requireAdmin, async (req, res) => {
    try {
      const query =
        `SELECT username, name, level FROM user ` +
        `WHERE username != '${req.user.username}'`; // Prevent from viewing admin itself
      console.log(`[DB] ${query}`);
      const result = await db.query(query);
      res.send(result);
    } catch (err) {
      console.log("DB query error: " + err);
      res.sendStatus(500);
    }
  });

  app.get("/api/user/:username", requireAdmin, async (req, res) => {
    try {
      const query =
        `SELECT username, name, level FROM user ` +
        `WHERE username = '${req.params.username}'`;
      console.log(`[DB] ${query}`);
      const result = await db.query(query);
      res.send(result[0]);
    } catch (err) {
      console.log("DB query error: " + err);
      res.sendStatus(500);
    }
  });

  app.get("/api/user", requireRegular, async (req, res) => {
    try {
      const query =
        `SELECT username, name, level FROM user ` +
        `WHERE username = '${req.user.username}'`;
      console.log(`[DB] ${query}`);
      const result = await db.query(query);
      res.send(result[0]);
    } catch (err) {
      console.log("DB query error: " + err);
      res.sendStatus(500);
    }
  });

  app.post("/api/user", requireAdmin, async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.name) {
      res.status(400).send({ error: "Missing username, password or name" });
    } else {
      try {
        const hash = await bcrypt.hash(req.body.password, 10);
        try {
          const query =
            `INSERT INTO user (username, password, name, level) ` +
            `VALUES ('${req.body.username}', '${hash}', ` +
            `'${req.body.name}', '${req.body.level || "DEFAULT"}')`;
          console.log(`[DB] ${query}`);
          await db.query(query);
          res.sendStatus(200);
        } catch (err) {
          console.log(`[DB] ${err}`);
          switch (err.code) {
            case "ER_DUP_ENTRY":
              res.status(400).send({ error: "Username is duplicate" });
              return;
            case "ER_NO_REFERENCED_ROW":
            case "ER_NO_REFERENCED_ROW_2":
              res.status(400).send({ error: "Level hasn't been defined" });
              return;
            default:
              res.status(400).send({ error: "DB query error" });
              return;
          }
        }
      } catch (err) {
        console.log("Bcrypt error: " + err);
        res.sendStatus(500);
      }
    }
  });

  app.delete("/api/user/:username", requireAdmin, async (req, res) => {
    try {
      // Check if user exists
      const userQuery =
        `SELECT name, level FROM user ` +
        `WHERE username = '${req.params.username}'`;
      const userResult = await db.query(userQuery);
      console.log(`[DB] ${userQuery}`);
      if (userResult.length === 0) {
        res
          .status(400)
          .send({ error: `User ${req.params.username} not exists` });
        return;
      }

      const query =
        `DELETE FROM user ` + `WHERE username = '${req.params.username}'`;
      console.log(`[DB] ${query}`);
      await db.query(query);
      res.sendStatus(200);
    } catch (err) {
      console.log("DB query error: " + err);
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
      // Check if user exists
      const userQuery =
        `SELECT name, level FROM user ` +
        `WHERE username = '${req.params.username}'`;
      const userResult = await db.query(userQuery);
      console.log(`[DB] ${userQuery}`);
      if (userResult.length === 0) {
        res
          .status(400)
          .send({ error: `User ${req.params.username} not exists` });
        return;
      }

      // Update password
      const query =
        `UPDATE user SET password = '${hash}' ` +
        `WHERE username = '${req.params.username}'`;
      console.log(`[DB] ${query}`);
      await db.query(query);
      res.sendStatus(200);
    } catch (err) {
      console.log(`[DB] ${err}`);
      res.status(500).send({ error: "DB query error" });
      return;
    }
  });

  app.put("/api/user/info/:username", requireAdmin, async (req, res) => {
    try {
      // Check if user exists
      const userQuery =
        `SELECT name, level FROM user ` +
        `WHERE username = '${req.params.username}'`;
      const userResult = await db.query(userQuery);
      console.log(`[DB] ${userQuery}`);
      if (userResult.length === 0) {
        res
          .status(400)
          .send({ error: `User ${req.params.username} not exists` });
        return;
      }

      // Update info
      const query =
        `UPDATE user SET ` +
        `name = '${req.body.name ? req.body.name : userResult[0].name}', ` +
        `level = '${req.body.level ? req.body.level : userResult[0].level}' ` +
        `WHERE username = '${req.params.username}'`;
      console.log(`[DB] ${query}`);
      await db.query(query);
      res.sendStatus(200);
    } catch (err) {
      console.log(`[DB] ${err}`);
      res.status(500).send({ error: "DB query error" });
      return;
    }
  });

  app.put("/api/user/password", requireRegular, async (req, res) => {
    if (!req.body.password) {
      res.status(400).send({ error: "Missing password" });
      return;
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    try {
      // Check if user exists
      const userQuery =
        `SELECT name, level FROM user ` +
        `WHERE username = '${req.user.username}'`;
      const userResult = await db.query(userQuery);
      console.log(`[DB] ${userQuery}`);
      if (userResult.length === 0) {
        res.status(400).send({ error: `User ${req.user.username} not exists` });
        return;
      }

      // Update password
      const query =
        `UPDATE user SET password = '${hash}' ` +
        `WHERE username = '${req.user.username}'`;
      console.log(`[DB] ${query}`);
      await db.query(query);
      res.sendStatus(200);
    } catch (err) {
      console.log(`[DB] ${err}`);
      res.status(500).send({ error: "DB query error" });
      return;
    }
  });

  app.put("/api/user/info", requireRegular, async (req, res) => {
    try {
      // Check if user exists
      const userQuery =
        `SELECT name, level FROM user ` +
        `WHERE username = '${req.user.username}'`;
      const userResult = await db.query(userQuery);
      console.log(`[DB] ${userQuery}`);
      if (userResult.length === 0) {
        res.status(400).send({ error: `User ${req.user.username} not exists` });
        return;
      }

      // Update info
      const query =
        `UPDATE user SET ` +
        `name = '${req.body.name ? req.body.name : userResult[0].name}', ` +
        `level = '${req.body.level ? req.body.level : userResult[0].level}' ` +
        `WHERE username = '${req.user.username}'`;
      console.log(`[DB] ${query}`);
      await db.query(query);
      res.sendStatus(200);
    } catch (err) {
      console.log(`[DB] ${err}`);
      res.status(500).send({ error: "DB query error" });
      return;
    }
  });
};
