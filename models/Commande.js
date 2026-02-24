// models/Commande.js
const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  dateCommande: {
    type: Date,
    default: Date.now
  },
  statutPaiement: {
    type: String,
    enum: ['en_attente', 'payé', 'échoué'],
    default: 'en_attente'
  },
  statut: {
    type: String,
    enum: ['en_attente', 'commandé' ,'annulé'],
    default: 'en_attente'
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  // ✅ Ajouter la référence vers Offre
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offre",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Commande", commandeSchema);