var admin = require("firebase-admin");

var serviceAccount = require("./express-firebase-5597c-firebase-adminsdk-m7o75-0ff973185f");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express-firebase-5597c.firebaseio.com/",
});
const db = admin.database();

const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => {
  db.ref("contacts").once("value", (snapshot) => {
    data = snapshot.val();
    res.render("index", { contacts: data });
  });
});

router.post("/new-contact", (req, res) => {
  const newContact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  db.ref("contacts").push(newContact);
  //   console.log(req.body.email);
  //   res.send("rec");
  res.redirect("/");
});
router.get("/delete/:id", (req, res) => {
  db.ref("contacts/" + req.params.id).remove();
  res.redirect("/");
});
module.exports = router;
