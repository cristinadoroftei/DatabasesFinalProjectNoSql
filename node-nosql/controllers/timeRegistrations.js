const Task = require("../models/tasks");
const { removeEmpty } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    minutes_registered: reqBody.minutes_registered,
    notes: reqBody.notes,
    date: reqBody.date,
    locked: reqBody.locked,
  };
  return removeEmpty(obj);
};

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
  const newTimeReg = { ...filterReqBody(req.body), person_id: req.person._id };
  const taskId = req.body.task_id;
  Task.findByIdAndUpdate(taskId)
    .then((task) => {
      task.time_registrations.push(newTimeReg);
      const addedTimeReg =
        task.time_registrations[task.time_registrations.length - 1];
      task.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
      });
      return res.status(200).send({ response: addedTimeReg });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};

// exports.updateTimeRegistration = (req, res, next) => {
//   const timeRegistrationId = req.params.id;
//   TimeRegistrations.findByPk(timeRegistrationId)
//     .then((timeRegistration) => timeRegistration.update(req.body))
//     .then((updatedTimeRegistration) =>
//       res.send({ response: updatedTimeRegistration })
//     )
//     .catch((err) => {
//       console.log(err);
//       return res.sendStatus(400);
//     });
// };

// exports.deleteTimeRegistration = (req, res, next) => {
//   const timeRegistrationId = req.params.id;
//   TimeRegistrations.findByPk(timeRegistrationId)
//     .then((timeRegistration) => timeRegistration.destroy())
//     .then(() => res.sendStatus(200))
//     .catch((err) => {
//       console.log(err);
//       return res.sendStatus(400);
//     });
// };
