// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  destinataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["commande", "info", "systeme"],
    default: "info"
  },
  lu: {
    type: Boolean,
    default: false
  },
  dateEnvoi: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);