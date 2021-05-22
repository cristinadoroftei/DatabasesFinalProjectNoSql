const Persons = require('../models/persons');
const Companies = require('../models/companies');
const bcrypt = require('bcrypt');

exports.registerCompany = (req, res, next) => {
  Companies.create(req.body).then((company) => {
    company
      .createPerson({
        ...req.body,
        user_type: 'ADMIN',
        password: bcrypt.hashSync(req.body.password, 12),
      })
      .then((person) => res.send({ company: company, person: person }))
      .catch((err) => {
        console.log(err);
        return res.sendStatus(400);
      });
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  Persons.findOne({ where: { username: username } }).then((person) => {
    if (!person) {
      return res.status(401).send('Invalid username!');
    }
    if (bcrypt.compareSync(password, person.password)) {
      req.session.person = person;
      return req.session.save((err) => {
        if (err) {
          console.log('Error!', err);
          next(err);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      return res.status(401).send('Invalid password!');
    }
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error when logging out!');
      return res.sendStatus(404);
    } else {
      return res.sendStatus(200);
    }
  });
};
