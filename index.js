const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World yes 123");
});
// app.post();
// app.put();
// app.delete();
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
  // res.send(req.quary);
  // res.send(req.params.year);
});

//Environment Variables port:
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

// npm i express
// npm i -g nodemon
