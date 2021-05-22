const _companies = require("./companies");
const _invoices = require("./invoices");
const _persons = require("./persons");
const _project_statuses = require("./project_statuses");
const _projects = require("./projects");
const _projects_persons = require("./projects_persons");
const _status_categories = require("./status_categories");
const _task_statuses = require("./task_statuses");
const _tasks = require("./tasks");
const _teams = require("./teams");
const _teams_persons = require("./teams_persons");
const _tests = require("./tests");
const _time_registrations = require("./time_registrations");

function initModels() {
  const companies = _companies;
  const invoices = _invoices;
  const persons = _persons;
  const project_statuses = _project_statuses;
  const projects = _projects;
  const projects_persons = _projects_persons;
  const status_categories = _status_categories;
  const task_statuses = _task_statuses;
  const tasks = _tasks;
  const teams = _teams;
  const teams_persons = _teams_persons;
  const tests = _tests;
  const time_registrations = _time_registrations;

  persons.belongsToMany(projects, {
    as: "projects",
    through: projects_persons,
    foreignKey: "person_id",
    otherKey: "project_id",
  });
  projects.belongsToMany(persons, {
    as: "people",
    through: projects_persons,
    foreignKey: "project_id",
    otherKey: "person_id",
  });
  persons.belongsToMany(teams, {
    as: "teams",
    through: teams_persons,
    foreignKey: "person_id",
    otherKey: "team_id",
  });
  teams.belongsToMany(persons, {
    as: "people",
    through: teams_persons,
    foreignKey: "team_id",
    otherKey: "person_id",
  });
  projects_persons.belongsTo(persons, {
    as: "person",
    foreignKey: "person_id",
  });
  persons.hasMany(projects_persons, {
    as: "projectsPeople",
    foreignKey: "person_id",
  });
  projects_persons.belongsTo(projects, {
    as: "project",
    foreignKey: "project_id",
  });
  projects.hasMany(projects_persons, {
    as: "projectsPeople",
    foreignKey: "project_id",
  });
  persons.belongsTo(companies, { as: "company", foreignKey: "company_id" });
  companies.hasMany(persons, { as: "people", foreignKey: "company_id" });
  projects.belongsTo(companies, { as: "company", foreignKey: "company_id" });
  companies.hasMany(projects, { as: "projects", foreignKey: "company_id" });
  projects.belongsTo(companies, { as: "client", foreignKey: "client_id" });
  companies.hasMany(projects, {
    as: "clientProjects",
    foreignKey: "client_id",
  });
  teams_persons.belongsTo(persons, { as: "person", foreignKey: "person_id" });
  persons.hasMany(teams_persons, {
    as: "teamsPeople",
    foreignKey: "person_id",
  });
  time_registrations.belongsTo(persons, {
    as: "person",
    foreignKey: "person_id",
  });
  persons.hasMany(time_registrations, {
    as: "timeRegistrations",
    foreignKey: "person_id",
  });
  projects.belongsTo(project_statuses, {
    as: "projectStatus",
    foreignKey: "project_status_id",
  });
  project_statuses.hasMany(projects, {
    as: "projects",
    foreignKey: "project_status_id",
  });
  invoices.belongsTo(projects, { as: "project", foreignKey: "project_id" });
  projects.hasMany(invoices, { as: "invoices", foreignKey: "project_id" });
  tasks.belongsTo(projects, { as: "project", foreignKey: "project_id" });
  projects.hasMany(tasks, { as: "tasks", foreignKey: "project_id" });
  project_statuses.belongsTo(status_categories, {
    as: "statusCategory",
    foreignKey: "status_category_id",
  });
  status_categories.hasMany(project_statuses, {
    as: "projectStatuses",
    foreignKey: "status_category_id",
  });
  task_statuses.belongsTo(status_categories, {
    as: "statusCategory",
    foreignKey: "status_category_id",
  });
  status_categories.hasMany(task_statuses, {
    as: "taskStatuses",
    foreignKey: "status_category_id",
  });
  tasks.belongsTo(task_statuses, {
    as: "taskStatus",
    foreignKey: "task_status_id",
  });
  task_statuses.hasMany(tasks, { as: "tasks", foreignKey: "task_status_id" });
  task_statuses.belongsTo(projects, {
    as: "projects",
    foreignKey: "project_id",
  });
  projects.hasMany(task_statuses, {
    as: "taskStatuses",
    foreignKey: "project_id",
  });
  project_statuses.belongsTo(companies, {
    as: "companies",
    foreignKey: "company_id",
  });
  companies.hasMany(project_statuses, {
    as: "projectStatuses",
    foreignKey: "company_id",
  });
  teams.belongsTo(companies, {
    as: "companies",
    foreignKey: "company_id",
  });
  companies.hasMany(teams, {
    as: "teams",
    foreignKey: "company_id",
  });
  time_registrations.belongsTo(tasks, { as: "task", foreignKey: "task_id" });
  tasks.hasMany(time_registrations, {
    as: "timeRegistrations",
    foreignKey: "task_id",
  });
  teams_persons.belongsTo(teams, { as: "team", foreignKey: "team_id" });
  teams.hasMany(teams_persons, { as: "teamsPeople", foreignKey: "team_id" });

  return {
    companies,
    invoices,
    persons,
    project_statuses,
    projects,
    projects_persons,
    status_categories,
    task_statuses,
    tasks,
    teams,
    teams_persons,
    tests,
    time_registrations,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
