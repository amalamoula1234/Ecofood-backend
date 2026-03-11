const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String
  },
  telephone: {
    type: String
  },
  type_cuisine: {
    type: String
  },
  photo: {
    type: String
  },
// ✅ Lien avec User (restaurateur)
  restaurateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);