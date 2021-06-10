const Person = require("../models/persons");
const bcrypt = require("bcrypt");
const {
  removeEmpty,
  mergeObjWithReqBody,
  ITEMS_PER_PAGE,
} = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    first_name: reqBody.first_name,
    last_name: reqBody.last_name,
    user_type: reqBody.user_type,
    username: reqBody.username,
    password: reqBody.password,
    internal_cost: reqBody.internal_cost,
  };
  return removeEmpty(obj);
};

exports.getPersons = (req, res, next) => {
  const page = req.query.page;

  Person.find({ company_id: req.person.company_id })
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then((persons) => res.send({ response: persons }))
    .catch((err) => {
      console.log("Error when fetching persons!", err);
      return res.sendStatus(400);
    });
};

exports.getPersonById = (req, res, next) => {
  const personId = req.params.id;
  Person.findById(personId)
    .then((person) => res.send({ response: person }))
    .catch((err) => {
      console.log(`Error when fetching person with id: ${personId}!`, err);
      return res.sendStatus(400);
    });
};

exports.createPerson = (req, res, next) => {
  const filteredReqBody = filterReqBody(req.body);
  const person = new Person({
    ...filteredReqBody,
    password: bcrypt.hashSync(filteredReqBody.password, 12),
    company_id: req.body.from_signup
      ? req.body.company_id
      : req.session.person.company_id,
  });
  person
    .save()
    .then((person) => {
      return res.send({ response: person });
    })
    .catch((err) => {
      console.log("Error when creating person", err);
      return res.sendStatus(400);
    });
};

exports.updatePerson = (req, res, next) => {
  const personId = req.params.id;
  const filteredReqBody = filterReqBody(req.body);
  Person.findById(personId)
    .then((person) => {
      mergeObjWithReqBody(person, filteredReqBody);
      return person.save();
    })
    .then((updatedPerson) => res.send({ response: updatedPerson }))
    .catch((err) => {
      console.log("Error when updating person!", err);
      return res.sendStatus(400);
    });
};

exports.deletePerson = (req, res, next) => {
  const personId = req.params.id;
  Person.findByIdAndRemove(personId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error when deleting person!", err);
      return res.sendStatus(400);
    });
};
