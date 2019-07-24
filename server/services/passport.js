const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./database");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    db.query(`SELECT password FROM user WHERE username = '${username}'`)
      .then(result => {
        // Compare plaintext password to hashed password
        if (result.length === 0) {
          // User not exists
          console.log("User not exists");
          done(null, false);
        } else {
          bcrypt.compare(password, result[0].password, (err, res) => {
            if (err) {
              console.log("Bcrypt compare error: " + err);
              done(null, false);
            }
            if (res) {
              // Password correct
              done(null, username);
            } else {
              // Password incorrect
              done(null, false);
            }
          });
        }
      })
      .catch(err => {
        console.log("DB query error: " + err);
        done(null, false);
      });
  })
);
