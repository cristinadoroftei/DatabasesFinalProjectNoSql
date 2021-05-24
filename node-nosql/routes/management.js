const express = require("express");

/* const projectsController = require("../controllers/projects");
const tasksController = require("../controllers/tasks");
const invoicesController = require("../controllers/invoices");
const projectStatusesController = require("../controllers/projectStatuses");
 */
const personsController = require("../controllers/persons");
/*
const timeRegistrationsController = require("../controllers/timeRegistrations");
const taskStatusesController = require("../controllers/taskStatuses");
*/
const companiesController = require("../controllers/companies");
/*
//const teamsController = require("../controllers/teams");
//const isAdmin = require("../util/validators").isAdmin;
*/
const router = express.Router();

//GET

/* router.get("/projects", projectsController.getProjects);

router.get("/projects/:id", projectsController.getProjectsById);

router.get("/tasks/:id/project", tasksController.getTasksByProjectId);

router.get("/invoices", invoicesController.getInvoices);

router.get("/invoices/:id", invoicesController.getInvoice);

router.get("/project_statuses", projectStatusesController.getProjectStatuses);
*/

//router.get("/persons", personsController.getPersons);

router.get("/persons/:id", personsController.getPersonById);

/* router.get(
  "/time_registrations/:id/task",
  timeRegistrationsController.getTimeRegistrationByTaskId
);

router.get(
  "/task_statuses/:id/project",
  taskStatusesController.getTaskStatusesByProjectId
);
 */

router.get("/companies/:id", companiesController.getCompany);

/* router.get("/teams/:id/company", teamsController.getTeamsByCompanyId);

//POST
router.post("/projects", projectsController.createProject);

router.post("/invoices", invoicesController.createInvoice);

router.post("/project_statuses", projectStatusesController.createProjectStatus);

router.post("/tasks", tasksController.createTask);

*/

router.post("/persons", personsController.createPerson);

/*
router.post(
  "/time_registrations",
  timeRegistrationsController.createTimeRegistration
);

router.post("/task_statuses", taskStatusesController.createTaskStatus);  */

router.post("/companies", companiesController.createCompany);

/* router.post("/teams", isAdmin, teamsController.createTeam);

//PUT
router.put("/projects/:id", projectsController.updateProject);

router.put("/invoices/:id", invoicesController.updateInvoice);

router.put(
  "/project_statuses/:id",
  projectStatusesController.updateProjectStatus
);

router.put("/tasks/:id", tasksController.updateTask);

*/
router.put("/persons/:id", personsController.updatePerson);

/*

router.put(
  "/time_registrations/:id",
  timeRegistrationsController.updateTimeRegistration
);

router.put("/task_statuses/:id", taskStatusesController.updateTaskStatus);

*/

router.put("/companies/:id", companiesController.updateCompany);

/* router.put("/teams/:id", isAdmin, teamsController.updateTeam);

//DELETE
router.delete("/projects/:id", projectsController.deleteProject);

router.delete("/invoices/:id", invoicesController.deleteInvoice);

router.delete(
  "/project_statuses/:id",
  projectStatusesController.deleteProjectStatus
);

router.delete("/tasks/:id", tasksController.deleteTask);

*/
router.delete("/persons/:id", personsController.deletePerson);
/*

router.delete(
  "/time_registrations/:id",
  timeRegistrationsController.deleteTimeRegistration
);

router.delete("/task_statuses/:id", taskStatusesController.deleteTaskStatus);
*/
router.delete("/companies/:id", companiesController.deleteCompany);

//router.delete("/teams/:id", isAdmin, teamsController.deleteTeam);

module.exports = router;
