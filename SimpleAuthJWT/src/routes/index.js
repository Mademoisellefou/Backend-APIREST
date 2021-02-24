const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  const token = await jwt.sign(
    {
      _id: newUser._id,
    },
    "SecretKey"
  );
  return res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("UnAuthoitzed Request");
  }
  if (user.password !== password) {
    return res.status(401).send("Wrong");
  }
  const token = await jwt.sign(
    {
      _id: user._id,
    },
    "SecretKey"
  );
  var str = "Bearer ";
  res.set("authorization", str.concat(token));
  return res.status(200).json({ token });
});

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("UnAuthoitzed Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (token === "null") {
      return res.status(401).send("UnAuthoitzed Request");
    }
    const payload = await jwt.verify(token, "SecretKey");
    if (!payload) {
      return res.status(401).send("UnAuthoitzed Request");
    }
    req.userId = payload._id;
    next();
  } catch (err) {
    return res.status(401).send("UnAuthoitzed Request");
  }
}
router.get("/tasks", (req, res) => {
  res.json("no private");
});
router.get("/Ptasks", verifyToken, (req, res) => {
  res.json("private");
});
module.exports = router;
