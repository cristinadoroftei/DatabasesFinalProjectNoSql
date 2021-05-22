const TimeRegistrations = require('../models/time_registrations');

exports.getTimeRegistrationByTaskId = (req, res, next) => {
  const taskId = req.params.id;
  TimeRegistrations.findAll({ where: { task_id: taskId } })
    .then((timeRegistrations) => res.send({ response: timeRegistrations }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createTimeRegistration = (req, res, next) => {
  TimeRegistrations.create(req.body)
    .then((timeRegistration) => res.send({ response: timeRegistration }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateTimeRegistration = (req, res, next) => {
  const timeRegistrationId = req.params.id;
  TimeRegistrations.findByPk(timeRegistrationId)
    .then((timeRegistration) => timeRegistration.update(req.body))
    .then((updatedTimeRegistration) =>
      res.send({ response: updatedTimeRegistration })
    )
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.deleteTimeRegistration = (req, res, next) => {
  const timeRegistrationId = req.params.id;
  TimeRegistrations.findByPk(timeRegistrationId)
    .then((timeRegistration) => timeRegistration.destroy())
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};
