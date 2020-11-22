const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
require("dotenv").config();
const app = express();
require("./database");
//settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("PORT", process.env.DB_PORT || 4000);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//Configuration  multer
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
//midlewars
app.use(morgan("dev"));
//LINK
app.use(require("./routes/index"));
app.listen(app.get("PORT"), () => {
  console.log(`listn on Port ${app.get("PORT")}`);
});
