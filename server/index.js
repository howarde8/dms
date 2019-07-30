const app = require("express")();
const http = require("http").Server(app);
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const logger = require("./services/logger");

require("./services/passport");

app.use(bodyParser.json());
app.use(
  cookieSession({
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  // Log all requests
  logger.info(
    `[Req] ${req.method} ${req.url} ` +
      `by ${req.user.username}(${req.user.level})`
  );
  next();
});

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/levelRoutes")(app);

http.listen(5000, () => {
  logger.info("HTTP server is listening on port 5000");
});
