var express = require("express");
var mongoose = require("mongoose");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var req = require("request");
var path = require("path");
var app = express();
var resultTask = [];
const expressLayouts = require("express-ejs-layouts");
const request = require("request");
const Question = require("./models/Question.js");
var i = 0;
var db = mongoose.connection;
//Using modules(idk what this means really)
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//mongodb://localhost/seUnifiedTopology: true
mongoose
  .connect("mongodb://localhost/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("db is connect");
  })
  .catch((err) => console.error(err));
app.get("/addquestions", (req, res) => {
  res.render("addquestion");
});
app.post("/addquestions", async (req, res) => {
  const { question, correct, a, b, c } = req.body;
  const newQuestion = new Question({ question, correct, a, b, c });
  await newQuestion.save(function (err) {
    if (err) return handleError(err);
  });
  res.redirect("/");
});
app.get("/", async (req, res) => {
  var listall = await Question.find();
  if (i >= listall.length) {
    var responses = await Question.find({}).select("correct -_id");
    for (let j = 0; j < listall.length; j++) {
      if (resultTask[j] != responses[j].correct) {
        res.send("Failed");
        return;
      }
    }
  
    res.send("Succes");
    return;
  }
  res.render("landing", { question: listall[i] });
});
app.post("/", (req, res) => {
  i++;
  resultTask = [...resultTask, req.body.response];
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
