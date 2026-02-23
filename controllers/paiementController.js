// controllers/paiementController.js
const Paiement = require("../models/paiement");
const Commande = require("../models/commande");

// Ajouter un paiement
exports.ajouterPaiement = async (req, res) => {
  try {
    const nouveauPaiement = new Paiement(req.body);
    await nouveauPaiement.save();

    // Mettre à jour le statutPaiement de la commande → 'payé'
    await Commande.findByIdAndUpdate(
      req.body.commande,
      { statutPaiement: 'payé' },
      { new: true }
    );

    res.status(201).json(nouveauPaiement);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

// Lister tous les paiements
exports.listerPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find()
      .populate({
        path: "commande",
        populate: { path: "offre", select: "description prix" }
      });
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un paiement par ID
exports.getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findById(req.params.id)
      .populate({
        path: "commande",
        populate: { path: "offre", select: "description prix" }
      });

    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.json(paiement);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Supprimer un paiement
exports.deletePaiement = async (req, res) => {
  try {
    const deletedPaiement = await Paiement.findByIdAndDelete(req.params.id);

    if (!deletedPaiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    // Remettre le statutPaiement de la commande → 'en_attente'
    await Commande.findByIdAndUpdate(
      deletedPaiement.commande,
      { statutPaiement: 'en_attente' }
    );

    res.json({ message: "Paiement supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};