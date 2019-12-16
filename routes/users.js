const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const users = await User.find().select("name email");

  res.send(users);
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).send("User already exists");
  }

  try {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    user.password = await bcrypt.hash(user.password, 10);

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(await user.save());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
