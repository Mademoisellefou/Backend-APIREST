const express = require("express");
const router = express.Router();
const {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  logout,
} = require("../controller/auth.controller.js");
//SIGNUP

router.get("/signup", renderSignUp);
router.post("/signup", signUp);

//SIGNIN

router.get("/signin", renderSignIn);
router.post("/signin", signIn);

router.get("/logout", logout);
module.exports = router;
