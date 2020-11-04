const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  console.log("ENTER");
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).send("Token Invalido");
  }
};
