const express = require("express");

const projectsController = require("../controllers/projects");
const tasksController = require("../controllers/tasks");
const invoicesController = require("../controllers/invoices");
const projectStatusesController = require("../controllers/projectStatuses");
const personsController = require("../controllers/persons");
const timeRegistrationsController = require("../controllers/timeRegistrations");
const taskStatusesController = require("../controllers/taskStatuses");
const companiesController = require("../controllers/companies");
const teamsController = require("../controllers/teams");
const isAdmin = require("../util/validators").isAdmin;

const router = express.Router();

//GET

router.get("/projects", projectsController.getProjects);

router.get("/projects/:id", projectsController.getProjectsById);

router.get("/tasks/:id/project", tasksController.getTasksByProjectId);

router.get("/invoices", invoicesController.getInvoices);

router.get("/invoices/:id", invoicesController.getInvoice);

router.get(
  "/company/project_statuses",
  projectStatusesController.getProjectStatusesForCompany
);
router.get(
  "/company/project_statuses/:statusId",
  projectStatusesController.getProjectStatusById
);

router.get("/persons", personsController.getPersons);

router.get("/persons/:id", personsController.getPersonById);

router.get(
  "/tasks/:taskId/time_registrations",
  timeRegistrationsController.getTimeRegistrationByTaskId
);

router.get(
  "/tasks/:taskId/time_registrations/:timeRegId",
  timeRegistrationsController.getTimeRegistrationById
);

router.get(
  "/projects/:id/task_statuses",
  taskStatusesController.getTaskStatusesByProjectId
);

router.get(
  "/projects/:projectId/task_statuses/:statusId",
  taskStatusesController.getTaskStatusesById
);

router.get("/companies/:id", companiesController.getCompany);

router.get("/teams", teamsController.getTeams);

//POST

router.post("/projects", projectsController.createProject);

router.post("/invoices/:projectId", invoicesController.createInvoice);

router.post(
  "/company/project_statuses",
  projectStatusesController.createProjectStatus
);

router.post("/tasks", tasksController.createTask);

router.post("/persons", personsController.createPerson);

router.post(
  "/tasks/:taskId/time_registrations",
  timeRegistrationsController.createTimeRegistration
);

router.post(
  "/projects/:id/task_statuses",
  taskStatusesController.createTaskStatus
);

router.post("/companies", companiesController.createCompany);

router.post("/teams", isAdmin, teamsController.createTeam);

//PUT

router.put("/projects/:id", projectsController.updateProject);

router.put(
  "/projects/:projectId/invoices/:invoiceId",
  invoicesController.updateInvoice
);

router.put(
  "/company/project_statuses/:statusId",
  projectStatusesController.updateProjectStatus
);

router.put("/tasks/:id", tasksController.updateTask);

router.put("/persons/:id", personsController.updatePerson);

router.put(
  "/tasks/:taskId/time_registrations/:timeRegId",
  timeRegistrationsController.updateTimeRegistration
);

router.put(
  "/projects/:projectId/task_statuses/:statusId",
  taskStatusesController.updateTaskStatus
);

router.put("/companies/:id", companiesController.updateCompany);

router.put("/teams/:teamId", isAdmin, teamsController.updateTeam);

//DELETE

router.delete("/projects/:id", projectsController.deleteProject);

router.delete(
  "/projects/:projectId/invoices/:invoiceId",
  invoicesController.deleteInvoice
);

router.delete(
  "/company/project_statuses/:statusId",
  projectStatusesController.deleteProjectStatus
);

router.delete("/tasks/:id", tasksController.deleteTask);

router.delete("/persons/:id", personsController.deletePerson);

router.delete(
  "/tasks/:taskId/time_registrations/:timeRegId",
  timeRegistrationsController.deleteTimeRegistration
);

router.delete(
  "/projects/:projectId/task_statuses/:statusId",
  taskStatusesController.deleteTaskStatus
);

router.delete("/companies/:id", companiesController.deleteCompany);

router.delete("/teams/:teamId", isAdmin, teamsController.deleteTeam);

module.exports = router;
