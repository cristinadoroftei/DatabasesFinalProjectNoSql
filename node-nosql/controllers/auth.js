const Person = require("../models/persons");
const bcrypt = require("bcrypt");
const createCompany = require("../controllers/companies").createCompany;
const createPerson = require("../controllers/persons").createPerson;

exports.registerCompany = (req, res, next) => {
  req.body.from_signup = true;
  console.log("insingup!");
  createCompany(req, res, next)
    .then((company) => {
      req.body.user_type = "ADMIN";
      req.body.company_id = company._id;
      console.log("incompany!");
      createPerson(req, res, next);
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  Person.findOne({ username: username }).then((person) => {
    if (!person) {
      return res.status(401).send("Invalid username!");
    }
    if (bcrypt.compareSync(password, person.password)) {
      req.session.person = person;
      return req.session.save((err) => {
        if (err) {
          console.log("Error!", err);
          next(err);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      return res.status(401).send("Invalid password!");
    }
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error when logging out!");
      return res.sendStatus(404);
    } else {
      return res.sendStatus(200);
    }
  });
};
