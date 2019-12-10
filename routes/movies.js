const express = require("express");
const Movie = require("../models/movie");
const { Genre } = require("../models/genre");

const router = express.Router();

router.use(express.json());

//GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

//POST REQUEST //////////////////////////////////////////////////////////////////////

router.post("/", async (req, res) => {
  const genre = await Genre.findById(req.body.genre);
  if (!genre) {
    res.status(400).send("Invalid genre");
  }

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  try {
    res.send(await movie.save());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//SINGLE GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/:movie", async (req, res) => {
  const movie = await Movie.findOne({ title: req.params.movie });
  movie ? res.send(movie) : res.status(404).send("Movie not found");
});

//PUT REQUEST //////////////////////////////////////////////////////////////////////

router.put("/:id", async (req, res) => {
  const genre = Genre.findById("5dec43cbc4943b7216b0e705");
  if (!genre) {
    res.status(400).send("Invalid genre");
  }

  const movie = await Movie.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: "Saw",
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: 4,
        dailyRentalRate: 2
      }
    },
    { new: true }
  );

  try {
    res.send(movie);
  } catch (error) {
    res.send(error.message);
  }
});

//DELETE REQUEST //////////////////////////////////////////////////////////////////////

router.delete("/:movie", async (req, res) => {
  try {
    res.send(await Movie.deleteOne({ title: req.params.movie }));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
