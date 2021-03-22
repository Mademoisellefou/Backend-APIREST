const authCtrl = {};
const passport = require("passport");
authCtrl.renderSignUp = (req, res) => {
  res.render("auth/signup");
};
//signUp
authCtrl.signUp = passport.authenticate("local.signup", {
  successRedirect: "/signin",
  failureRedirect: "/signup",
  failureFlash: true,
});
authCtrl.renderSignIn = (req, res) => {
  res.render("auth/signin");
};
authCtrl.signIn = passport.authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureFlash: true,
});
authCtrl.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
module.exports = authCtrl;
