const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");

const { database, port } = require("./config.js");

//Iniitializacion
const app = express();
app.use(express.static('public'));
//config passport
require("./lib/passport.js");
//Settings
app.engine("handlebars", exphbs({ helpers: require("./lib/handlebars") }));
app.set("view engine", "handlebars");
//MIDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use(function (req, res, next) {
  res.locals.message = req.flash("message");
  res.locals.success = req.flash("success");
  res.locals.user = req.user;
  next();
});
//Routes

app.use(require("./routes/index.routes.js"));
app.use(require("./routes/auth.routes.js"));
app.use(require("./routes/user.routes.js"));
app.use("/links", require("./routes/links.route.js"));
//listening
app.listen(process.env.PORT, () => {
  console.log("listening ...");
});
module.exports = app;
