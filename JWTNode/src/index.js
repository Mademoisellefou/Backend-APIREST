const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(express.json());
//DOTENCVARIABLES
const dotenv = require("dotenv");
dotenv.config();
//Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//PORT
const PORT = process.env.PORT || 3000;
//BD
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connect to db");
  }
);
//ROUTES
app.use(require("./routes/auth"));
app.use(require("./routes/auth-jwt"));
app.use(require("./routes/posts"));
//ROUTE MIDLEWARE
app.listen(PORT, () => {
  console.log(`${PORT}`);
});
