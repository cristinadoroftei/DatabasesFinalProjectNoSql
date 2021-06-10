const Company = require("../models/companies");
const removeEmpty = require("../util/helpers").removeEmpty;
const mergeObjWithReqBody = require("../util/helpers").mergeObjWithReqBody;

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    contact_name: reqBody.contact_name,
    contact_email: reqBody.contact_email,
    contact_phone: reqBody.contact_phone,
  };
  return removeEmpty(obj);
};

exports.getCompany = (req, res, next) => {
  const companyId = req.params.id;
  Company.findById(companyId)
    .then((company) => res.send({ response: company }))
    .catch((err) => {
      console.log(`Error when fetching company with id: ${companyId}`, err);
      return res.sendStatus(400);
    });
};

exports.createCompany = (req, res, next) => {
  console.log("in create company!");
  const filteredReqBody = filterReqBody(req.body);
  filteredReqBody.project_statuses = [
    {
      name: "Planning",
      category: "TODO",
    },
    {
      name: "Running",
      category: "INPROGRESS",
    },
    {
      name: "Done",
      category: "DONE",
    },
  ];
  return Company.create(filteredReqBody)
    .then((result) => {
      console.log("Company created!");
      if (!req.body.from_signup) {
        res.sendStatus(200);
      }
      return result;
    })
    .catch((error) => console.log(error));
};

exports.updateCompany = (req, res, next) => {
  const companyId = req.params.id;
  const filteredReqBody = filterReqBody(req.body);
  Company.findById(companyId)
    .then((company) => {
      mergeObjWithReqBody(company, filteredReqBody);
      company.save();
    })
    .then((result) => {
      console.log("Company updated!");
      return res.sendStatus(200);
    })
    .catch((error) => console.log(error));
};

exports.deleteCompany = (req, res, next) => {
  const companyId = req.params.id;
  Company.findByIdAndRemove(companyId)
    .then(() => res.sendStatus(200))
    .catch((error) => console.log(error));
};
