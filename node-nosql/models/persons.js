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
/* const getManagementDatabase = require("../util/database").getManagementDatabase;

class Person {
  constructor(
    company_id,
    first_name,
    last_name,
    user_type,
    username,
    password,
    internal_cost
  ) {
    this.company_id = company_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_type = user_type;
    this.username = username;
    this.password = password;
    this.internal_cost = internal_cost;
  }

  save() {
    getManagementDatabase()
      .collection("persons")
      .insertOne(this)
      .then((person) => console.log(person))
      .catch((error) => console.log(error));
  }
}

module.exports = Person; */
