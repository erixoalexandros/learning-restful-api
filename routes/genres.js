const express = require("express");
const { Genre } = require("../models/genre");

const router = express.Router();

router.use(express.json());

//GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

//POST REQUEST //////////////////////////////////////////////////////////////////////

router.post("/:genre", async (req, res) => {
  const genre = new Genre({ name: req.params.genre });
  try {
    res.send(await genre.save());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//SINGLE GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/:genre", async (req, res) => {
  const genre = await Genre.findOne({ name: req.params.genre });
  genre ? res.send(genre) : res.status(404).send("Genre not found");
});

//PUT REQUEST //////////////////////////////////////////////////////////////////////

router.put("/:id", async (req, res) => {
  const genre = await Genre.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: "drama"
      }
    },
    { new: true }
  );

  try {
    res.send(genre);
  } catch (error) {
    res.send(error.message);
  }
});

//DELETE REQUEST //////////////////////////////////////////////////////////////////////

router.delete("/:genre", async (req, res) => {
  try {
    res.send(await Genre.deleteOne({ name: req.params.genre }));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
