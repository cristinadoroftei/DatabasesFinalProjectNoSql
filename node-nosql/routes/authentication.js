const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const Person = require("../models/persons");

const validate = (req, res, next) => {
  Person.findOne({ username: req.body.username }).then((person) => {
    if (person) {
      return res.sendStatus(409);
    }
  });
  if (req.body.password.length < 5) {
    return res.sendStatus(401);
  }
  next();
};

router.post("/signup", validate, authController.registerCompany);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;
