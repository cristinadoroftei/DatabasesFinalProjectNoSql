const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const options = require("./util/store");
const sessionStore = new MongoDBStore(options);

const errorController = require("./controllers/error");

const isAuthenticated = require("./util/validators").isAuthenticated;
const managementRoutes = require("./routes/management");
const authRoutes = require("./routes/authentication");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes);
app.use(isAuthenticated);
app.use(managementRoutes);

app.get("/500", errorController.get500);

//keep this always last
app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@dbfinal.iimye.mongodb.net/management?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error);
  });
