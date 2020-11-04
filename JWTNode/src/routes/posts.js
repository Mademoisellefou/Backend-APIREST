const Router = require("express").Router();
const verified = require("./auth-jwt");
Router.get("/post", verified, (req, res) => {
  res.json({
    posts: {
      title: "my firts post",
      description: "random data",
    },
  });
});
module.exports = Router;
