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
app.listen(3000, () => console.log("Listen on port 3000"));

// npm i express
// npm i -g nodemon
