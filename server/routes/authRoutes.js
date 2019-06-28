const passport = require("passport");

module.exports = app => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    console.log(req.user + " login");
    res.sendStatus(200);
  });

  app.post("/api/logout", (req, res) => {
    console.log(req.user + " logout");
    req.logout();
    res.sendStatus(200);
  });

  app.get("/api/current_user", (req, res) => {
    console.log("current_user", req.user);
    res.send(req.user);
  });
};
