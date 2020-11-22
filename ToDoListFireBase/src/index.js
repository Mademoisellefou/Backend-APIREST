const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
//Setting
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    
    extname: ".hbs",
  })
);
//midleware
app.set("view engine", ".hbs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routes/index.js"));
module.exports = app;
