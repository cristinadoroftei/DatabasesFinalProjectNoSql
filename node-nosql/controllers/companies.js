const Companies = require('../models/companies');

exports.getCompany = (req, res, next) => {
  const companyId = req.params.id;
  Companies.findByPk(companyId)
    .then((company) => res.send({ response: company }))
    .catch((err) => {
      console.log(`Error when fetching company with id: ${companyId}`, err);
      return res.sendStatus(400);
    });
};

exports.createCompany = (req, res, next) => {
  Companies.create(req.body)
    .then((company) => res.send({ response: company }))
    .catch((err) => {
      console.log('Error when creating company', err);
      return res.sendStatus(400);
    });
};

exports.updateCompany = (req, res, next) => {
  const companyId = req.params.id;
  Companies.findByPk(companyId)
    .then((company) => company.update(req.body))
    .then((updatedCompany) => res.send({ response: updatedCompany }))
    .catch((err) => {
      console.log('Error when updating company!');
      return res.sendStatus(400);
    });
};

exports.deleteCompany = (req, res, next) => {
  const companyId = req.params.id;
  Companies.findByPk(companyId)
    .then((company) => company.destroy())
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error when deleting company!', err);
      return res.sendStatus(400);
    });
};
