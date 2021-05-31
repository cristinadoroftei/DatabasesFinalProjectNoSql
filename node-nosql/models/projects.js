const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statusSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["TODO", "INPROGRESS", "DONE"],
    required: true,
  },
});

const invoiceSchema = new Schema({
  name: { type: String, required: true },
  notes: { type: String, required: false },
  created_date: { type: Date, required: true, default: Date.now() },
  due_date: { type: Date, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  paid: { type: Boolean, required: false },
});

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  start_date: { type: Date, required: false },
  end_date: { type: Date, required: false },
  billable: { type: Boolean, required: false },
  persons: [{ type: Schema.Types.ObjectId, ref: "Person", required: false }],
  company_id: { type: Schema.Types.ObjectId, required: true },
  client_id: { type: Schema.Types.ObjectId, required: false },
  applied_status: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company.project_statuses",
  },
  task_statuses: [statusSchema],
  invoices: [invoiceSchema],
  locked_date: { type: Date, required: false },
});

module.exports = mongoose.model("Project", projectSchema);
