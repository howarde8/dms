const app = require("express")();
const http = require("http").Server(app);
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

require("./services/passport");

app.use(bodyParser.json());
app.use(
  cookieSession({
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

http.listen(5000, () => {
  console.log("HTTP server is listening on port 5000");
});