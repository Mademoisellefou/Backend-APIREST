const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const helpers = require("./helpers.js");
const pool = require("../database.js");
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * from users WHERE username = ?", [
        username,
      ]);
      if (rows.length > 0) {
        var user = rows[0];
        console.log(user);
        var validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "welcome" + user.username));
        } else {
          done(null, false, req.flash("message", "incorrect Password"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "The Username does not exists.")
        );
      }
    }
  )
);
// passport.use(
//   "local.signup",
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//       const { fullname } = req.body;
//       let newUser = {
//         fullname,
//         username,
//         password,
//       };
//       newUser.password = await helpers.encryptPassword(password);
//       const result = await pool.query("INSERT INTO users SET ?", newUser);
//       newUser.id = result.insertId;
//       return done(null, newUser);
//     }
//   )
// );
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;
      let newUser = {
        fullname,
        username,
        password,
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO users SET ?", newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
