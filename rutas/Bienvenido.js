const express = require("express");
const router = express.Router();
const link = require("../config/link");

router.get("/Bienvenido", function (req, res) {
  if (!req.session.login) {
    res.render("index", { link });
  } else {
    res.render("Bienvenido", { datos: req.session, link });
  }
});

module.exports = router;
