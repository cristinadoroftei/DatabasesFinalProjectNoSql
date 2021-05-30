const Project = require("../models/projects");
const { removeEmpty, mergeObjWithReqBody } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    description: reqBody.description,
    start_date: reqBody.start_date,
    end_date: reqBody.end_date,
    billable: reqBody.billable,
    persons: reqBody.persons,
    company_id: reqBody.company_id,
    client_id: reqBody.client_id,
    applied_status: reqBody.applied_status,
    task_statuses: reqBody.task_statuses,
    invoices: reqBody.invoices,
  };
  return removeEmpty(obj);
};

exports.getProjects = (req, res, next) => {
  Project.find({
    company_id: req.session.person.company_id,
  })
    .then((projects) => {
      res.send({ response: projects });
    })
    .catch((err) => {
      console.log("Error when fetching projects!", err);
      return res.sendStatus(400);
    });
};

exports.createProject = (req, res, next) => {
  const filteredReqBody = filterReqBody(req.body);
  filteredReqBody.task_statuses = [
    {
      name: "To do",
      category: "TODO",
    },
    {
      name: "In progress",
      category: "INPROGRESS",
    },
    {
      name: "Done",
      category: "DONE",
    },
  ];
  const project = new Project(filteredReqBody);
  project
    .save()
    .then((project) => res.send({ response: project }))
    .catch((err) => {
      console.log("Error when creating a new project!", err);
      return res.sendStatus(400);
    });
};

exports.getProjectsById = (req, res, next) => {
  const projId = req.params.id;
  Project.findById(projId)
    .then((project) => {
      res.send({ response: project });
    })
    .catch((err) => {
      console.log("Error when getting project by id!", err);
      return res.sendStatus(400);
    });
};

exports.updateProject = (req, res, next) => {
  const projId = req.params.id;
  const filteredReqBody = filterReqBody(req.body);

  Project.findById(projId)
    .then((project) => {
      mergeObjWithReqBody(project, filteredReqBody);
      return project.save();
    })
    .then((updatedProject) => {
      return res.send({ response: updatedProject });
    })
    .catch((err) => {
      console.log("error in updating project!", err);
      return res.sendStatus(400);
    });
};

exports.deleteProject = (req, res, next) => {
  const projId = req.params.id;
  Project.findByIdAndRemove(projId)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in deleting project", err);
      return res.sendStatus(400);
    });
};
