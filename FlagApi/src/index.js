const express = require("express");
const exphbs = require("express-handlebars");
const track = require("novelcovid");
const path = require("path");
//app
const app = express();
app.set("PORT", 3000);
app.set("views", path.join(__dirname, "views"));
const api = require("novelcovid");
app.set("view engine", ".hbs");
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);
app.get("/list", (req, res) => {
  api.countries().then((resultado) => res.render("home", { info: resultado }));
});

app.listen(app.get("PORT"), () => {
  console.log(` listen ${app.get("PORT")}`);
});
