/* const mongodb = require("mongodb");
const removeEmpty = require("../util/helpers").removeEmpty; */

/* class Company {
  constructor(name, contact_name, contact_email, contact_phone, id) {
    this.name = name;
    this.contact_name = contact_name;
    this.contact_email = contact_email;
    this.contact_phone = contact_phone;
    this._id = mongodb.ObjectId(id);
  }

  save() {
    return getManagementDatabase()
      .collection("companies")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  update() {
    return getManagementDatabase()
      .collection("companies")
      .updateOne({ _id: this._id }, { $set: removeEmpty(this) })
      .then((updatedCompany) => {
        console.log(updatedCompany);
        return updatedCompany;
      })
      .catch((error) => console.log(error));
  }

  static getById(companyId) {
    return getManagementDatabase()
      .collection("companies")
      .findOne({ _id: new mongodb.ObjectId(companyId) })
      .then((company) => {
        console.log(company);
        return company;
      })
      .catch((error) => console.log(error));
  }

  static delete(companyId) {
    return getManagementDatabase()
      .collection("companies")
      .deleteOne({ _id: new mongodb.ObjectId(companyId) })
      .then((result) => console.log("Company deleted!"))
      .catch((error) => console.log(error));
  }
}

module.exports = Company;
 */
