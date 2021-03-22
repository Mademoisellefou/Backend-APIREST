const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../lib/auth.js");
const {
  renderAddLink,
  addLink,
  renderLinks,
  editLink,
  deleteLink,
  renderEditLink,
} = require("../controller/links.controller.js");

//auth

router.use(isLoggedIn);

//CRUD

router.get("/add", renderAddLink);
router.post("/add", addLink);

router.get("/", isLoggedIn, renderLinks);

router.get("/delete/:id", deleteLink);
router.get("/edit/:id", renderEditLink);
router.post("/edit/:id", editLink);

module.exports = router;
