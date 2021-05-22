const getManagementDatabase = require("../util/database").getManagementDatabase;

class Company {
  constructor(name, contact_name, contact_email, contact_phone) {
    this.name = name;
    this.contact_name = contact_name;
    this.contact_email = contact_email;
    this.contact_phone = contact_phone;
  }

  save() {
    const managementDatabase = getManagementDatabase();
    return managementDatabase
      .collection("companies")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}

module.exports = Company;
