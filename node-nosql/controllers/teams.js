const Teams = require('../models/teams');
const Companies = require('../models/companies');

exports.getTeamsByCompanyId = (req, res, next) => {
  const companyId = req.params.id;
  Companies.findByPk(companyId)
    .then((company) => company.getTeams())
    .then((teams) => res.send({ response: teams }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createTeam = (req, res, next) => {
  req.person
    .getCompany()
    .then((company) => company.createTeam(req.body))
    .then((team) => res.send({ response: team }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateTeam = (req, res, next) => {
  const teamId = req.params.id;
  Teams.findByPk(teamId)
    .then((team) => team.update(req.body))
    .then((updatedTeam) => res.send({ response: updatedTeam }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.deleteTeam = (req, res, next) => {
  const teamId = req.params.id;
  Teams.findByPk(teamId)
    .then((team) => team.destroy())
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};
