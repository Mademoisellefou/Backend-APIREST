function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403);
    return res.send("You need to Sign in");
  }
  next();
}
function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("No role founded");
    }
    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
