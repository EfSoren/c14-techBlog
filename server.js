const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const session = require("express-session");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const sessionInfo = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionInfo));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("static"));
app.use(routes);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
