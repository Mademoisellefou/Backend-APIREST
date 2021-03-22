const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth.js");
const { renderUserProfile } = require("../controller/user.controller.js");

router.get("/profile", isLoggedIn, renderUserProfile);

module.exports = router;
