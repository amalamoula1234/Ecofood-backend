const Avis = require("../models/Avis");

// Ajouter un avis (Client)
exports.ajouterAvis = async (req, res) => {
  try {
    const { restaurant, note, commentaire } = req.body;
    const nouvelAvis = new Avis({
      user: req.user.id,
      restaurant,
      note,
      commentaire,
      statut: "en_attente" // Par défaut
    });
    await nouvelAvis.save();
    res.status(201).json({ message: "Avis envoyé avec succès. Il sera visible après modération.", avis: nouvelAvis });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: err.message });
  }
};

// Lister les avis CONFIRMÉS pour un restaurant spécifique
exports.listerAvisPublic = async (req, res) => {
  try {
    const avis = await Avis.find({ restaurant: req.params.restaurantId, statut: "confirmé" })
      .populate("user", "nom prenom")
      .sort({ date: -1 });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lister TOUS les avis (Admin)
exports.listerTousLesAvisAdmin = async (req, res) => {
  try {
    const avis = await Avis.find()
      .populate("user", "nom prenom email")
      .populate("restaurant", "nom")
      .sort({ date: -1 });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Valider ou Rejeter un avis (Admin)
exports.modifierStatutAvis = async (req, res) => {
  try {
    const { statut } = req.body;
    const updatedAvis = await Avis.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true, runValidators: true }
    );

    if (!updatedAvis) {
      return res.status(404).json({ message: "Avis non trouvé" });
    }

    res.json({ message: `Avis mis à jour vers: ${statut}`, avis: updatedAvis });
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

// Supprimer un avis
exports.supprimerAvis = async (req, res) => {
    try {
      const deletedAvis = await Avis.findByIdAndDelete(req.params.id);
      if (!deletedAvis) {
        return res.status(404).json({ message: "Avis non trouvé" });
      }
      res.json({ message: "Avis supprimé définitivement" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
