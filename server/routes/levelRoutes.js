const db = require("../services/database");
const requireAdmin = require("../middlewares/requireAuthorize").admin;

module.exports = app => {
  app.get("/api/levels", requireAdmin, async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM level");
      res.send(result);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.post("/api/level", requireAdmin, async (req, res) => {
    try {
      await db.query("INSERT INTO level (name) VALUES (?)", req.body.name);
      res.sendStatus(201);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).send({ error: "Level name is duplicate" });
        return;
      }
      res.sendStatus(500);
    }
  });

  app.delete("/api/level/:name", requireAdmin, async (req, res) => {
    if (req.params.name.toUpperCase() === "ADMIN") {
      res.status(400).send({ error: "ADMIN cannot be deleted" });
      return;
    }

    try {
      await db.query("DELETE FROM level WHERE name = ?", req.params.name);
      res.sendStatus(200);
    } catch (err) {
      if (
        err.code === "ER_ROW_IS_REFERENCED" ||
        err.code === "ER_ROW_IS_REFERENCED_2"
      ) {
        res.status(400).send({
          error: "Level is used, edit the user who uses the level first"
        });
        return;
      } else {
        res.sendStatus(500);
        return;
      }
    }
  });

  app.put("/api/level/:name", requireAdmin, async (req, res) => {
    if (req.params.name.toUpperCase() === "ADMIN") {
      res.status(400).send({ error: "ADMIN cannot be updated" });
      return;
    }

    try {
      await db.query(
        "UPDATE level SET name = ? WHERE name = ?",
        req.body.name,
        req.params.name
      );
      res.sendStatus(200);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).send({ error: "Level name is duplicate" });
        return;
      }
      res.sendStatus(500);
    }
  });
};
