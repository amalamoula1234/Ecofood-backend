// models/Offre.js
const mongoose = require("mongoose");

const offreSchema = new mongoose.Schema({
  nom: {                
    type: String,
    required: true,
    trim: true,
  },
  categorie: {
    type: String,
    default: "Autre",
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0,
  },
  prixAncien: {
    type: Number,
    default: null, // prix original avant promo
  },
  dureeHeures: {
    type: Number,
    default: 1, // 1H par défaut
  },
  dateDebut: {
    type: Date,
    default: Date.now, // commence l'offre maintenant
  },
  
  disponibilite: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,  
    default: null,
  },
    restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Offre", offreSchema);