const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  statut: { type: String, enum: ["non_lu", "lu"], default: "non_lu" }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
