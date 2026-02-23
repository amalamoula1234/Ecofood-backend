// models/Offre.js
const mongoose = require("mongoose");

const offreSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  disponibilite: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Offre", offreSchema);