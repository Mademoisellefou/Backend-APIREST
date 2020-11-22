const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Imagesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("listen db");
  })
  .catch((err) => {
    console.log(err);
  });
