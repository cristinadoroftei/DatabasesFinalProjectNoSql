const Project = require("../models/projects");
const { mergeObjWithReqBody, removeEmpty } = require("../util/helpers");

const filterReqBody = (reqBody) => {
  const obj = {
    name: reqBody.name,
    notes: reqBody.notes,
    created_date: reqBody.created_date,
    due_date: reqBody.due_date,
    start_date: reqBody.start_date,
    end_date: reqBody.end_date,
    paid: reqBody.paid,
  };
  return removeEmpty(obj);
};

exports.getInvoices = (req, res, next) => {
  Project.find({
    company_id: req.person.company_id,
  })
    .then((projects) => {
      //get all the invoices from all the projects in a single array
      const invoices = [].concat(
        ...projects.map((project) => project.invoices)
      );
      res.send({ response: invoices });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.getInvoice = (req, res, next) => {
  const invoiceId = req.params.id;

  Project.findOne({ "invoices._id": invoiceId })
    .then((project) => {
      const invoice = project.invoices.id(invoiceId);
      return res.send({ response: invoice });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateInvoice = (req, res, next) => {
  const { invoiceId, projectId } = req.params;
  const filteredReqBody = filterReqBody(req.body);
  Project.findByIdAndUpdate(projectId)
    .then((project) => {
      const index = project.invoices.findIndex(
        (invoice) => invoice._id.toString() === invoiceId.toString()
      );
      mergeObjWithReqBody(project.invoices[index], filteredReqBody);
      project.save();
      return res.status(200).send({ response: project.invoices[index] });
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};

exports.deleteInvoice = (req, res, next) => {
  const { invoiceId, projectId } = req.params;

  Project.findById(projectId)
    .then((project) => {
      project.invoices.pull(invoiceId);
      return project.save();
    })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};

exports.createInvoice = (req, res, next) => {
  const projectId = req.params.projectId;
  const filteredReqBody = filterReqBody(req.body);
  Project.findById(projectId)
    .then((project) => {
      project.invoices.push(filteredReqBody);
      const addedInvoice = project.invoices[project.invoices.length - 1];
      project.save();
      return res.status(200).send({ response: addedInvoice });
    })
    .catch((error) => {
      console.log(error);
      return res.sendStatus(400);
    });
};
