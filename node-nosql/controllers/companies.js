const Company = require("../models/companies");

exports.getCompany = (req, res, next) => {
  const companyId = req.params.id;
  Company.getById(companyId)
    .then((company) => res.send({ response: company }))
    .catch((err) => {
      console.log(`Error when fetching company with id: ${companyId}`, err);
      return res.sendStatus(400);
    });
};

exports.createCompany = (req, res, next) => {
  const { name, contact_name, contact_email, contact_phone } = req.body;
  const company = new Company(name, contact_name, contact_email, contact_phone);
  company
    .save()
    .then((result) => {
      console.log("Company created!");
      return res.sendStatus(200);
    })
    .catch((error) => console.log(error));
};

exports.updateCompany = (req, res, next) => {
  const companyId = req.params.id;
  const { name, contact_name, contact_email, contact_phone } = req.body;
  const companyToUpdate = new Company(
    name,
    contact_name,
    contact_email,
    contact_phone,
    companyId
  );
  return companyToUpdate
    .update()
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => console.log(error));
};

exports.deleteCompany = (req, res, next) => {
  const companyId = req.params.id;
  Company.delete(companyId)
    .then(() => res.sendStatus(200))
    .catch((error) => console.log(error));
};
