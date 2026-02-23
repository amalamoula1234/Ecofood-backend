// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
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