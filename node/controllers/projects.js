const Projects = require('../models/projects');

exports.getProjects = (req, res, next) => {
  console.log(req.session.person);
  req.session.person.getCompany().then((company) => console.log(company));
  Projects.findAll({
    where: { company_id: req.person.company_id },
  })
    .then((projects) => {
      res.send({ response: projects });
    })
    .catch((err) => {
      console.log('Error when fetching projects!', err);
      return res.sendStatus(400);
    });
};

exports.createProject = (req, res, next) => {
  Projects.create(req.body)
    .then((project) => res.send({ response: project }))
    .catch((err) => {
      console.log('Error when creating a new project!', err);
      return res.sendStatus(400);
    });
};

exports.getProjectsById = (req, res, next) => {
  const projId = req.params.id;
  Projects.findByPk(projId)
    .then((project) => {
      res.send({ response: project });
    })
    .catch((err) => {
      console.log('Error when getting project by id!', err);
      return res.sendStatus(400);
    });
};

exports.updateProject = (req, res, next) => {
  const projId = req.params.id;

  Projects.findByPk(projId)
    .then((project) => {
      return project.update(req.body);
    })
    .then((updatedProject) => {
      return res.send({ response: updatedProject });
    })
    .catch((err) => {
      console.log('error in updating project!', err);
      return res.sendStatus(400);
    });
};

exports.deleteProject = (req, res, next) => {
  const projId = req.params.id;
  Projects.findByPk(projId)
    .then((project) => {
      return project.destroy();
    })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error in deleting project', err);
      return res.sendStatus(400);
    });
};
