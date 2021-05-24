const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact_name: {
    type: String,
    required: false,
  },
  contact_email: {
    type: String,
    required: false,
  },
  contact_phone: {
    type: String,
    required: false,
  },
  project_statuses: [
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Company", companySchema);
