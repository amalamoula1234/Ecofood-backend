// models/Restaurant.js
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  telephone: String,
  description: String,
  categorie: {
    type: String,
    
  },
  horaires: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);