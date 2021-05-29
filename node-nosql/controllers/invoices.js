const Invoices = require("../models/invoices");
const Projects = require("../models/projects");

exports.getInvoices = (req, res, next) => {
  Projects.find({
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
  Invoices.findByPk(invoiceId)
    .then((invoice) => {
      return res.send({ response: invoice });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.updateInvoice = (req, res, next) => {
  const invoiceId = req.params.id;
  Invoices.findByPk(invoiceId)
    .then((invoice) => {
      return invoice.update(req.body);
    })
    .then((updatedInvoice) => {
      return res.send({ response: updatedInvoice });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

exports.deleteInvoice = (req, res, next) => {
  const invoiceId = req.params.id;
  Invoices.findByPk(invoiceId)
    .then((invoice) => {
      return invoice.destroy();
    })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in deleting invoice", err);
      return res.sendStatus(400);
    });
};

exports.createInvoice = (req, res, next) => {
  Invoices.create(req.body)
    .then((invoice) => res.send({ response: invoice }))
    .catch((err) => {
      console.log("Error when creating invoice", err);
      return res.sendStatus(400);
    });
};
