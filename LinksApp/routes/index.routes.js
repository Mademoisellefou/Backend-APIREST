const express = require("express");
const router = express.Router();

const { renderIndex } = require("../controller/index.controller.js");
router.get("/", renderIndex);
module.exports = router;
