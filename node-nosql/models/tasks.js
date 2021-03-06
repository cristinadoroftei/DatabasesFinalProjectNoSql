const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeRegistrationSchema = new Schema({
  minutes_registered: { type: Number, required: true },
  notes: { type: String, required: false },
  date: { type: Date, required: true },
  locked: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Project.invoices",
  },
  person_id: { type: Schema.Types.ObjectId, required: true, ref: "Person" },
});

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  minutesEstimated: { type: Number, required: true },
  start_date: { type: Date, required: false },
  end_date: { type: Date, required: false },
  project_id: { type: Schema.Types.ObjectId, required: true, ref: "Project" },
  applied_status_id: {
    type: Schema.Types.ObjectId,
    ref: "Project.task_statuses",
    required: true,
  },
  time_registrations: [timeRegistrationSchema],
});

module.exports = mongoose.model("Task", taskSchema);
