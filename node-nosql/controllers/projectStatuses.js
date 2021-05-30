const Company = require("../models/companies");

const { removeEmpty, mergeObjWithReqBody } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    category: reqBody.category,
  };
  return removeEmpty(obj);
};

exports.getProjectStatusesForCompany = (req, res, next) => {
  const companyId = req.session.person.company_id;
  Company.findById(companyId)
    .then((company) => {
      const statuses = company.get("project_statuses");
      return res.status(200).send({ response: statuses });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.getProjectStatusById = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const statusId = req.params.statusId;
  Company.findById(companyId)
    .then((company) => {
      const foundProjectStatus = company.project_statuses.find(
        (status) => status._id.toString() === statusId.toString()
      );
      return res.status(200).send({ response: foundProjectStatus });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createProjectStatus = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const newProjectStatus = filterReqBody(req.body);
  Company.findById(companyId)
    .then((company) => {
      company.project_statuses.push(newProjectStatus);
      const addedProjectStatus =
        company.project_statuses[company.project_statuses.length - 1];
      company.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res.status(200).send({ response: addedProjectStatus });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateProjectStatus = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const statusId = req.params.statusId;
  const updatedStatus = filterReqBody(req.body);
  Company.findById(companyId)
    .then((company) => {
      const index = company.project_statuses.findIndex(
        (status) => status._id.toString() === statusId.toString()
      );
      mergeObjWithReqBody(company.project_statuses[index], updatedStatus);
      company.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res
          .status(200)
          .send({ response: company.project_statuses[index] });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.deleteProjectStatus = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const statusId = req.params.statusId;
  Company.findById(companyId)
    .then((company) => {
      company.project_statuses.pull(statusId);
      company.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res.sendStatus(200);
      });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};