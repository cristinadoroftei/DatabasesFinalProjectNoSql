const Persons = require('../models/persons');
const bcrypt = require('bcrypt');

exports.getPersons = (req, res, next) => {
  Persons.findAll({
    where: { company_id: req.person.company_id },
  })
    .then((persons) => res.send({ response: persons }))
    .catch((err) => {
      console.log('Error when fetching persons!', err);
      return res.sendStatus(400);
    });
};

exports.getPersonById = (req, res, next) => {
  const personId = req.params.id;
  Persons.findByPk(personId)
    .then((person) => res.send({ response: person }))
    .catch((err) => {
      console.log(`Error when fetching person with id: ${personId}!`, err);
      return res.sendStatus(400);
    });
};

exports.createPerson = (req, res, next) => {
  Persons.create({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 12),
  })
    .then((person) => res.send({ response: person }))
    .catch((err) => {
      console.log('Error when creating person', err);
      return res.sendStatus(400);
    });
};

exports.updatePerson = (req, res, next) => {
  const personId = req.params.id;
  Persons.findByPk(personId)
    .then((person) => person.update(req.body))
    .then((updatedPerson) => res.send({ response: updatedPerson }))
    .catch((err) => {
      console.log('Error when updating person!', err);
      return res.sendStatus(400);
    });
};

exports.deletePerson = (req, res, next) => {
  const personId = req.params.id;
  Persons.findByPk(personId)
    .then((person) => person.destroy())
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error when deleting person!', err);
      return res.sendStatus(400);
    });
};
