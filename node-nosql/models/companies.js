const mongodb = require("mongodb");
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

  static getById(companyId) {
    const managementDatabase = getManagementDatabase();
    return managementDatabase
      .collection("companies")
      .findOne({ _id: new mongodb.ObjectID(companyId) })
      .then((company) => {
        console.log(company);
        return company;
      })
      .catch((error) => console.log(error));
  }
}

module.exports = Company;
