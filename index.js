const express = require("express");
const courses = require("./courses");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <form action="/api/courses/" method="post">
    <input name="title" type="text" />
    <input type="submit" />
  </form>`);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });

  if (course) {
    res.send(course);
  } else {
    res.status(404);
    res.send("Object not found");
  }
});

app.post("/api/courses/", (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    title: req.body.title
  };

  courses.push(newCourse);
  res.send(newCourse);
  console.log(courses);
});

const port = process.env.PORT || "3000";
app.listen(port);
