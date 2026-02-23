// controllers/restaurantController.js
const Restaurant = require("../models/restaurant");

// Ajouter un restaurant
exports.ajouterRestaurant = async (req, res) => {
  try {
    const nouveauRestaurant = new Restaurant(req.body);
    await nouveauRestaurant.save();
    res.status(201).json(nouveauRestaurant);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

// Lister tous les restaurants
exports.listerRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un restaurant par ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant non trouvé" });
    }

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Rechercher par catégorie
exports.getRestaurantsByCategorie = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ categorie: req.params.categorie });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Mettre à jour un restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant non trouvé" });
    }

    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

// Supprimer un restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant non trouvé" });
    }

    res.json({ message: "Restaurant supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};