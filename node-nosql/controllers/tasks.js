const Task = require("../models/tasks");

const { removeEmpty, mergeObjWithReqBody } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    description: reqBody.description,
    minutesEstimated: reqBody.minutesEstimated,
    start_date: reqBody.start_date,
    end_date: reqBody.end_date,
    locked_date: reqBody.locked_date,
    project_id: reqBody.project_id,
    applied_status_id: reqBody.applied_status_id,
    time_registrations: reqBody.time_registrations,
  };
  return removeEmpty(obj);
};

exports.getTasksByProjectId = (req, res, next) => {
  const projId = req.params.id;
  Task.find({
    project_id: projId,
  })
    .then((tasks) => {
      res.send({ tasks: tasks });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createTask = (req, res, next) => {
  const filteredReqBody = filterReqBody(req.body);
  Task.create(filteredReqBody)
    .then((task) => res.status(200).send({ response: task }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateTask = (req, res, next) => {
  const taskId = req.params.id;
  const filteredReqBody = filterReqBody(req.body);
  Task.findByIdAndUpdate(taskId, filteredReqBody, { new: true }, (err, doc) => {
    if (doc === null) {
      console.log("Task not found");
      res.sendStatus(404);
    } else if (err) {
      console.log("Error:", err);
      res.sendStatus(400);
    } else {
      res.status(200).send({ response: doc });
    }
  });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};
