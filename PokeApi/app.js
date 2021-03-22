var DS = require("./lib/data-store.js");
//Express
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
app.use(express.static(__dirnam + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//Express + HandleBars
var hbs = require("hbs");
app.set("view engine", "hbs");
app.set("views", "./views");
require("handlebars-form-helpers").register(hbs.handlebars);
//Cnotrollers
var pokemonController = require("./controllers/pokemon.js");
app.use("/pokemon", pokemonController);
// HOME
app.get("/", function (req, res) {
  res.render("home");
});
module.exports = app;
