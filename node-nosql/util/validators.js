const Person = require("../models/persons");

exports.isAdmin = (req, res, next) => {
  const userType = req.person.user_type;
  if (userType !== "ADMIN") return res.sendStatus(401);
  next();
};
exports.isAuthenticated = (req, res, next) => {
  if (req.session.person) {
    Person.findOne({ username: req.session.person.username })
      .then((person) => {
        req.person = person;
        next();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
  if (!req.session.person) {
    return res.sendStatus(401);
  }
};
