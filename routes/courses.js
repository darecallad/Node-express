const express = require("express");
const router = express.Rounter();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "coures2" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with given ID was not found");
  res.send(course);
  //   res.send(req.params.id);

  // res.send(req.query);
  // res.send(req.params.year);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
