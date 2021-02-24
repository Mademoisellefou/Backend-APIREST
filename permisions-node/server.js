const express = require("express");
const app = express();
const { ROLE, users } = require("./data.js");
const { authUser, authRole } = require("./basicAuth");
const projectRouter = require("./routes/projects");

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dash Board");
});

app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
    res.send("Success");
  }
  next();
}
app.listen(process.env.PORT)
