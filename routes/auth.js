const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).send("User not found");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      res.send(token);
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
