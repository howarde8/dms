const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    // For test usage
    if (username === "admin") {
      done(null, username);
    } else if (username === "distr") {
      done(null, username);
    } else {
      done(null, false);
    }
  })
);
