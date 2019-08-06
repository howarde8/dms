const passport = require("passport");

module.exports = app => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    console.log(`[Auth] ${req.user.username} (level: ${req.user.level}) login`);
    res.sendStatus(200);
  });

  app.post("/api/logout", (req, res) => {
    if (req.user) {
      console.log(
        `[Auth] ${req.user.username} (level: ${req.user.level}) logout`
      );
      req.logout();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
