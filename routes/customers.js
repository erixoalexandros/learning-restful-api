const express = require("express");
const Customer = require("../models/customer");

const router = express.Router();
router.use(express.json());

//GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

//POST REQUEST //////////////////////////////////////////////////////////////////////

router.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  try {
    res.send(await customer.save());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//SINGLE GET REQUEST //////////////////////////////////////////////////////////////////////

router.get("/:customer", async (req, res) => {
  const customer = await Customer.findOne({ name: req.params.customer });
  customer ? res.send(customer) : res.status(404).send("Customer not found");
});

//PUT REQUEST //////////////////////////////////////////////////////////////////////

router.put("/:id", async (req, res) => {
  const customer = await Customer.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: "Erick"
      }
    },
    { new: true }
  );

  try {
    res.send(customer);
  } catch (error) {
    res.send(error.message);
  }
});

//DELETE REQUEST //////////////////////////////////////////////////////////////////////

router.delete("/:id", async (req, res) => {
  try {
    res.send(await Customer.deleteOne({ _id: req.params.id }));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
