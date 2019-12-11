const mongoose = require("mongoose");

const Rental = mongoose.model("Rental", {
  customer: {
    type: new mongoose.Schema({
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
        validate: /^\d{10}$/g
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
      },
      numberInStock: {
        type: Number,
        min: 0,
        max: 255
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

module.exports = Rental;
