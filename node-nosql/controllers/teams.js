const Company = require("../models/companies");
const { removeEmpty, mergeObjWithReqBody } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    persons: reqBody.persons,
  };
  return removeEmpty(obj);
};

exports.getTeams = (req, res, next) => {
  const companyId = req.session.person.company_id;
  Company.findById(companyId)
    .then((company) => {
      const teams = company.get("teams");
      return res.status(200).send({ response: teams });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};

exports.createTeam = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const newTeam = filterReqBody(req.body);
  Company.findById(companyId)
    .then((company) => {
      company.teams.push(newTeam);
      const addedTeam = company.teams[company.teams.length - 1];
      company.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res.status(200).send({ response: addedTeam });
      });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};

exports.updateTeam = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const teamId = req.params.teamId;
  const updatedTeam = filterReqBody(req.body);
  Company.findById(companyId)
    .then((company) => {
      const index = company.teams.findIndex(
        (team) => team._id.toString() === teamId.toString()
      );
      mergeObjWithReqBody(company.teams[index], updatedTeam);
      company.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res.status(200).send({ response: company.teams[index] });
      });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};

exports.deleteTeam = (req, res, next) => {
  const companyId = req.session.person.company_id;
  const teamId = req.params.teamId;
  Company.findById(companyId)
    .then((company) => {
      company.teams.pull(teamId);
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
