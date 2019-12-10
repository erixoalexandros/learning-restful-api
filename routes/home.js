const express = require("express");
const Genre = require("../models/genre");

const router = express.Router();

router.get("/", (req, res) => {
  const getGenres = async () => {
    try {
      const result = await Genre.find();
      res.send(result);
    } catch (error) {
      res.send(error.message);
    }
  };

  return getGenres();
});

module.exports = router;
