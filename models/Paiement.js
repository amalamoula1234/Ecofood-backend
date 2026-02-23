// models/Paiement.js
const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema({
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commande",
    required: true
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  },
  datePaiement: {
    type: Date,
    default: Date.now
  },
  methodePaiement: {
    type: String,
    enum: ['carte', 'espèces'],
    default: 'espèces'
  }
}, { timestamps: true });

module.exports = mongoose.model("Paiement", paiementSchema);