const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly", {
    //Fix all deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.log("Could not connect to MongoDB..."));

const app = express();

// Routes
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");

app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

const port = process.env.PORT || "3000";
app.listen(port);
