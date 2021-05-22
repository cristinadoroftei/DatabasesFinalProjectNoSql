const Persons = require("../models/persons");

exports.isAdmin = (req, res, next) => {
  const userType = req.person.user_type;
  if (userType !== "ADMIN") return res.sendStatus(400);
  next();
};
exports.isAuthenticated = (req, res, next) => {
  // console.log(req.session);
  if (req.session.person) {
    Persons.findOne({ where: { username: req.session.person.username } })
      .then((person) => {
        req.person = person;
        next();
      })
      .catch((err) => {
        console.log(err);
        // maybe
        // next(err);
      });
  }
  if (!req.session.person) {
    return res.sendStatus(400);
  }
};
