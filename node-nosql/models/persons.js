const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  internal_cost: {
    type: Number,
    required: true,
  },
  company_id: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
