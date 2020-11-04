const { Router } = require("express");
const User = require("./../Model/User");
const router = Router();
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, LoginValidation } = require("../validation");
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details);
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Alredy exist");
  const salt = await crypt.genSalt(10);
  const HashPassword = await crypt.hash(req.body.password, salt);
  req.body.password = HashPassword;
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_KEY);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/Login", async (req, res) => {
  const { error } = LoginValidation(req.body);
  if (error) return res.send(error.details);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("NO User exist");
  const verifie = await crypt.compare(req.body.password, user.password);
  if (!verifie) return res.status(400).send("password is incorrect");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
  res.header('auth-token',token).send(token);
});
module.exports = router;
