const TaskStatuses = require('../models/task_statuses');
const Projects = require('../models/projects');

exports.getTaskStatusesByProjectId = (req, res, next) => {
  const projectId = req.params.id;
  Projects.findByPk(projectId)
    .then((project) => project.getTaskStatuses())
    .then((taskStatuses) => res.send({ response: taskStatuses }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createTaskStatus = (req, res, next) => {
  TaskStatuses.create(req.body)
    .then((taskStatus) => res.send({ response: taskStatus }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateTaskStatus = (req, res, next) => {
  const taskStatusId = req.params.id;
  TaskStatuses.findByPk(taskStatusId)
    .then((taskStatus) => taskStatus.update(req.body))
    .then((updatedTaskStatuses) => res.send({ response: updatedTaskStatuses }))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.deleteTaskStatus = (req, res, next) => {
  const taskStatusId = req.params.id;
  TaskStatuses.findByPk(taskStatusId)
    .then((taskStatus) => taskStatus.destroy())
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};
