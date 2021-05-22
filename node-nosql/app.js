const express = require("express");
const app = express();
require("dotenv").config();

const mongoConnect = require("./util/database").mongoConnect;
const session = require("express-session");
const MYSQLSTORE = require("express-mysql-session")(session);
const options = require("./util/store");
const sessionStore = new MYSQLSTORE(options);

/* const errorController = require("./controllers/error");

const isAuthenticated = require("./util/validators").isAuthenticated; */
const managementRoutes = require("./routes/management");
//const authRoutes = require("./routes/authentication");

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

//app.use(authRoutes);
//app.use(isAuthenticated);
app.use(managementRoutes);

//app.get("/500", errorController.get500);

//keep this always last
/* app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
}); */

mongoConnect(() => {
  app.listen(3001);
});
