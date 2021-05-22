const getManagementDatabase = require("../util/database").getManagementDatabase;

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

module.exports = Person;
