const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model("Movie", {
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  }
});

module.exports = Movie;
