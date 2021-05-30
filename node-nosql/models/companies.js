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

const teamSchema = new Schema({
  name: { type: String, required: true },
  persons: [{ type: Schema.Types.ObjectId, ref: "Person", required: true }],
});

const companySchema = new Schema({
  name: { type: String, required: true },
  contact_name: { type: String, required: false },
  contact_email: { type: String, required: false },
  contact_phone: { type: String, required: false },
  project_statuses: [statusSchema],
  teams: [{ type: teamSchema, required: false }],
});

module.exports = mongoose.model("Company", companySchema);
