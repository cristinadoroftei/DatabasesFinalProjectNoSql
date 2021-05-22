const express = require("express");
const app = express();
require("dotenv").config();

const session = require("express-session");
const MYSQLSTORE = require("express-mysql-session")(session);
const options = require("./util/store");
const sessionStore = new MYSQLSTORE(options);

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

//initialize models to get all the cool magic methods: https://medium.com/@julianne.marik/sequelize-associations-magic-methods-c72008db91c9
const initModels = require("./models/init-models")();

const Persons = require("./models/persons");

const isAuthenticated = require("./util/validators").isAuthenticated;
const managementRoutes = require("./routes/management");
const authRoutes = require("./routes/authentication");

app.use(express.urlencoded());
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

//sync the models to the database by creating the appropriate tables and relatiions
sequelize
  .sync()
  .then(() => {
    const port = process.env.PORT ? process.env.PORT : 3001;

    const server = app.listen(port, (error) => {
      if (error) {
        console.log("Error starting the server");
      }
      console.log("Server running on port", server.address().port);
    });
  })
  .catch((err) => {
    console.log("error on syncing sequelize!", err);
  });
