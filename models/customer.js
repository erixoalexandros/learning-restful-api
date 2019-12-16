const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", {
  name: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 3
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: /^\d{10}$/
  }
});

module.exports = Customer;
