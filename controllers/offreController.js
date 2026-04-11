// controllers/offreController.js
const Offre = require("../models/Offre");
const Restaurant = require("../models/Restaurant");

// Ajouter une offre
exports.ajouterOffre = async (req, res) => {
  try {
    const nouvelleOffre = new Offre(req.body);
    await nouvelleOffre.save();
    res.status(201).json(nouvelleOffre);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

// Lister toutes les offres (Admin)
exports.listerOffres = async (req, res) => {
  try {
    const offres = await Offre.find().populate("restaurant", "nom");
    res.json(offres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lister MES offres (Restaurateur)
exports.getMesOffres = async (req, res) => {
  try {
    const userId = req.user.id;
    // Trouver les restaurants de ce restaurateur
    const restaurants = await Restaurant.find({ restaurateur: userId });
    const restaurantIds = restaurants.map(r => r._id);

    // Trouver les offres liées à ces restaurants
    const offres = await Offre.find({ restaurant: { $in: restaurantIds } }).populate("restaurant", "nom");
    res.json(offres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une offre par ID
exports.getOffreById = async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);

    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json(offre);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Mettre à jour une offre
exports.updateOffre = async (req, res) => {
  try {
    const updatedOffre = await Offre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOffre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json(updatedOffre);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

// Supprimer une offre
exports.deleteOffre = async (req, res) => {
  try {
    const deletedOffre = await Offre.findByIdAndDelete(req.params.id);

    if (!deletedOffre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json({ message: "Offre supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};
// Lister offres par restaurant (client)
exports.listerOffresParRestaurant = async (req, res) => {
  try {
    const offres = await Offre.find({ 
      restaurant: req.params.restaurantId,
      disponibilite: true
    }).populate("restaurant", "nom adresse photo");
    
    res.json(offres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};