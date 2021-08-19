const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const homepage = require("./routes/homepage");
const Joi = require("joi");
const morgan = require("morgan");

// morgan for http log
// helmet for secure app
const app = express();

app.set("view engine", "pug");
// app.set("views", "./views"); //default

// Configuration
console.log("application name: " + config.get("name"));
console.log("mail server: " + config.get("mail.host"));
console.log("mail password: " + config.get("mail.password"));
// export app_password= 1234

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

app.use(express.json());
// post
app.use(express.urlencoded({ extended: true })); //allow build in url
app.use(express.static("public"));
app.use(logger);
//install middleware function
app.use("/api/courses", courses); // every router start with /api/courses
app.use("/", homepage);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled");
}
// export NODE_ENV=production

//Do work...
dbDebugger("connected to the database");
//environment variables
// export DEBUG=app:startup
// export DEBUG=app:*
// DEBUG=app:db nodemon index.js

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
}); //install middleware function

//Environment Variables port:
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

// npm i express
// npm i -g nodemon
