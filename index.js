const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

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
  if (!course) res.status(404).send("the course with given ID was not found");
  res.send(course);
  //   res.send(req.params.id);

  // res.send(req.query);
  // res.send(req.params.year);
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    // 400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
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
