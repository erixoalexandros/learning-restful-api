const express = require("express");
const Rental = require("../models/rental");
const Movie = require("../models/movie");
const Customer = require("../models/customer");

const router = express.Router();
router.use(express.json());

//GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

//POST REQUEST //////////////////////////////////////////////////////////////////////

router.post("/", async (req, res) => {
  const movie = await Movie.findById(req.body.movie);
  if (!movie) {
    res.status(400).send("Movie Not Found");
  }

  const customer = await Customer.findById(req.body.customer);
  if (!customer) {
    res.status(400).send("Customer Not Found");
  }

  if (movie.numberInStock === 0) {
    res.status(400).send("Movie Not In Stock");
  }

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  movie.numberInStock--, movie.save();

  try {
    res.send(await rental.save());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
