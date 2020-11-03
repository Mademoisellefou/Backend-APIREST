const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
//API WEATHER
let apiKey = "8384157a505d4fb4ec9ffa856421316f";
let city = "portland";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const app = express();
//Set
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
//Settings
app.set("PORT", process.env.PORT || 3000);
app.get("/", (req, res) => {
  res.render("index");
});
//PORT
app.post("/", (req, res) => {
  request(url, function (err, response, body) {
    if (err) {
      console.log("error:", error);
    } else {
      let weather = JSON.parse(body);
      let weatherText = `Its ${weather.main.temp} degrees  in  ${weather.name}`;
      console.log(weatherText);
      res.render("index", { weather: weather.main.temp }); //weather
    }
  });
});
//listen
app.listen(app.get("PORT"), () => {
  console.log(`LOCALHOST${app.get("PORT")}`);
});
