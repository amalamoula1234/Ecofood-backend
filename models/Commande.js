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
    enum: ['en_attente', 'commandé', 'annulé'],
    default: 'en_attente'
  },
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offre",
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false  // ✅ pas required
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: false  // ✅ pas required
  },
  total: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.models.Commande || mongoose.model("Commande", commandeSchema);