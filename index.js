const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const logger = require("./logger");
const Joi = require("joi");
const morgan = require("morgan");
// morgan for http log
// helmet for secure app
const app = express();

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

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "coures2" },
];

app.get("/", (req, res) => {
  res.send("Hello World yes 123");
});
// app.post();
// app.put();
// app.delete();
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with given ID was not found");
  res.send(course);
  //   res.send(req.params.id);

  // res.send(req.query);
  // res.send(req.params.year);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(courses);
  res.send(course);
});

//Environment Variables port:
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

// npm i express
// npm i -g nodemon

app.put("/api/courses/:id", (req, res) => {
  // first lool up the course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("the course with given ID was not found");
  }
  // validate if incalid, return 400 -bad req

  const { error } = validateCourse(req.body);
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message);
  }
  // update course
  // return the updated course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  //look up the course
  // not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with given ID was not found");
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the same course
  res.send(course);
});
