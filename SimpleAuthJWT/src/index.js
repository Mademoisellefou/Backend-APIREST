require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
require("./data.js");
const api = require("./routes/index.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/", api);
app.listen(process.env.PORT);
