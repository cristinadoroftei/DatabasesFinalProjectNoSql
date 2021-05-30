const Project = require("../models/projects");

const { removeEmpty, mergeObjWithReqBody } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    category: reqBody.category,
  };
  return removeEmpty(obj);
};

exports.getTaskStatusesByProjectId = (req, res, next) => {
  const projectId = req.params.id;
  Project.findById(projectId)
    .then((project) => {
      const statuses = project.get("task_statuses");
      return res.status(200).send({ response: statuses });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.getTaskStatusesById = (req, res, next) => {
  const { projectId, statusId } = req.params;
  Project.findById(projectId)
    .then((project) => {
      const foundTaskStatus = project.task_statuses.find(
        (status) => status._id.toString() === statusId.toString()
      );
      return res.status(200).send({ response: foundTaskStatus });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.createTaskStatus = (req, res, next) => {
  const projectId = req.params.id;
  const newTaskStatus = filterReqBody(req.body);
  Project.findByIdAndUpdate(projectId)
    .then((project) => {
      project.task_statuses.push(newTaskStatus);
      const addedTaskStatus =
        project.task_statuses[project.task_statuses.length - 1];
      project.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        }
        return res.status(200).send({ response: addedTaskStatus });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateTaskStatus = (req, res, next) => {
  const { statusId, projectId } = req.params;
  const updatedStatus = filterReqBody(req.body);
  Project.findByIdAndUpdate(projectId)
    .then((project) => {
      const index = project.task_statuses.findIndex(
        (status) => status._id.toString() === statusId.toString()
      );
      mergeObjWithReqBody(project.task_statuses[index], updatedStatus);
      project.save();
      return res.status(200).send({ response: project.task_statuses[index] });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.deleteTaskStatus = (req, res, next) => {
  const { statusId, projectId } = req.params;
  Project.findByIdAndUpdate(projectId)
    .then((project) => {
      project.task_statuses.pull(statusId);
      project.save((err) => {
        if (err) {
          console.log("Error!", err);
          return res.sendStatus(400);
        } else {
          return res.sendStatus(200);
        }
      });
    })
    .catch((err) => {
      console.log("Error!", err);
      return res.sendStatus(400);
    });
};
