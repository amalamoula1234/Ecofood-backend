// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
   nom: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: String,
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offre",
    required: true
  },
  dateReservation: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: Number,
    required: true,
    min: 1
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);