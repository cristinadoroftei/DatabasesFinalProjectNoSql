const Task = require("../models/tasks");
const { removeEmpty, mergeObjWithReqBody } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    minutes_registered: reqBody.minutes_registered,
    notes: reqBody.notes,
    locked: reqBody.locked,
    date: reqBody.date
      ? new Date(reqBody.date).setUTCHours(0, 0, 0, 0)
      : new Date().setUTCHours(0, 0, 0, 0),
  };
  return removeEmpty(obj);
};

exports.getTimeRegistrationByTaskId = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => res.send({ response: task.time_registrations }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.getTimeRegistrationById = (req, res, next) => {
  const { taskId, timeRegId } = req.params;
  Task.findById(taskId)
    .then((task) => {
      const foundTimeReg = task.time_registrations.find(
        (timeReg) => timeReg._id.toString() === timeRegId.toString()
      );
      res.send({ response: foundTimeReg });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createTimeRegistration = (req, res, next) => {
  const newTimeReg = {
    ...filterReqBody(req.body),
    person_id: req.session.person._id,
  };
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => {
      task.time_registrations.push(newTimeReg);
      const addedTimeReg =
        task.time_registrations[task.time_registrations.length - 1];
      task.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res.status(200).send({ response: addedTimeReg });
      });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};

exports.updateTimeRegistration = (req, res, next) => {
  const { taskId, timeRegId } = req.params;
  const filteredReqBody = filterReqBody(req.body);
  Task.findById(taskId)
    .then((task) => {
      const index = task.time_registrations.findIndex(
        (timeReg) => timeReg._id.toString() === timeRegId
      );
      mergeObjWithReqBody(task.time_registrations[index], filteredReqBody);
      task.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res
          .status(200)
          .send({ response: task.time_registrations[index] });
      });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};

exports.deleteTimeRegistration = (req, res, next) => {
  const { taskId, timeRegId } = req.params;
  Task.findById(taskId)
    .then((task) => {
      task.time_registrations.pull(timeRegId);
      task.save((err) => {
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
