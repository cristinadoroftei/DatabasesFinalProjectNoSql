const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  start_date: {
    type: String,
    required: false,
  },
  end_date: {
    type: String,
    required: false,
  },
  billable: {
    type: Boolean,
    required: false,
  },
  persons: [{ type: Schema.Types.ObjectId, ref: "Person", required: false }],
  company_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  applied_status: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company.project_statuses",
  },
  task_statuses: [
    {
      name: {
        type: String,
        required: false,
      },
      category: {
        type: String,
        required: false,
      },
    },
  ],
  invoices: [
    {
      name: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
        required: false,
      },
      created_date: {
        type: String,
        required: true,
      },
      due_date: {
        type: String,
        required: true,
      },
      start_date: {
        type: String,
        required: true,
      },
      end_date: {
        type: String,
        required: true,
      },
      paid: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
