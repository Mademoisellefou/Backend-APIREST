const { Router } = require("express");
const path = require("path");
const { unlink } = require("fs-extra");
const Image = require("../models/image");
const router = Router();

router.get("/", async (req, res) => {
  const images = await Image.find();
  res.render("index", { images });
});
router.get("/upload", (req, res) => {
  res.render("upload");
});
router.post("/upload", async (req, res) => {
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/uploads/" + req.file.filename;
  console.log(image.path);
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;
  //   console.log(image);
  await image.save();
  res.redirect("/upload");
});
router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("profile", { image });
});
///image/5fb6cb7538e0400f5079f2a6
// router.get("/image/:id/delete", (req, send) => {});
module.exports = router;
