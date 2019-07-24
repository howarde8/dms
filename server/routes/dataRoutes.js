const bcrypt = require("bcrypt");
const db = require("../services/database");
const requireAuthorize = require("../middlewares/requireAuthorize");
const requireAdmin = requireAuthorize.admin;
const requireRegular = requireAuthorize.regular;

module.exports = app => {
  app.get("/api/user/all", requireAdmin, async (req, res) => {
    try {
      const result = await db.query(`SELECT name, level FROM user`);
      res.send(result);
    } catch (err) {
      console.log("DB query error: " + err);
      res.sendStatus(500);
    }
  });

  app.post("/api/user/add", requireAdmin, async (req, res) => {
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
              res.status(400).send({ error: "username is duplicate" });
              return;
            case "ER_NO_REFERENCED_ROW":
            case "ER_NO_REFERENCED_ROW_2":
              res.status(400).send({ error: "level hasn't been defined" });
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
};
