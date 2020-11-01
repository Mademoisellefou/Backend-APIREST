//imports
const express = require("express"); //express
const routes = require("./routes/index");
const cors = require("cors");
const Question = require("./models/Question");
const mongoose = require("mongoose"); //mongoose
const app = express(); //app
//Settings
app.set("Port", 3000);
//midlewares
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(routes);
//Conect toi db
mongoose
  .connect("mongodb://localhost/Quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("listen");
  })
  .catch((err) => {
    console.log(err);
  });
const db = mongoose.connection;

//Listen
app.listen(app.get("Port"), () => {
  console.log(`Server on Port ${app.get("Port")}`);
});
