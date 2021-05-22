const mongodb = require("mongodb");

//use this client to connect to the mongodb database
const MongoClient = mongodb.MongoClient;

//_ means this variable is only used in this file
let _management;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@dbfinal.iimye.mongodb.net/management?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected!");
      _management = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

const getManagementDatabase = () => {
  if (_management) {
    return _management;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getManagementDatabase = getManagementDatabase;
