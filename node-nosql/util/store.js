module.exports = {
  uri: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@dbfinal.iimye.mongodb.net/management?retryWrites=true&w=majority`,
  collection: "sessions",
};
