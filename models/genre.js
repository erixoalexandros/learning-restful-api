const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    minlength: 3
  }
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
