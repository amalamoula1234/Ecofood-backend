// controllers/commandeController.js
const Commande = require("../models/commande");

// Ajouter une commande
exports.ajouterCommande = async (req, res) => {
  try {
    const nouvelleCommande = new Commande(req.body);
    await nouvelleCommande.save();
    res.status(201).json(nouvelleCommande);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

// Lister toutes les commandes
exports.listerCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("offre", "description prix dateDebut dateFin disponibilite");
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate("offre", "description prix dateDebut dateFin disponibilite");

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(commande);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Mettre à jour le statut
exports.updateStatut = async (req, res) => {
  try {
    const { statut } = req.body;

    const valeursPermises = ['en_attente', 'commandé', 'annulé'];
    if (!valeursPermises.includes(statut)) {
      return res.status(400).json({ message: `Statut invalide. Valeurs permises : ${valeursPermises.join(', ')}` });
    }

    const updatedCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true, runValidators: true }
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(updatedCommande);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour du statut", error: err.message });
  }
};

// Mettre à jour le statut paiement
exports.updateStatutPaiement = async (req, res) => {
  try {
    const { statutPaiement } = req.body;

    const valeursPermises = ['en_attente', 'payé', 'échoué'];
    if (!valeursPermises.includes(statutPaiement)) {
      return res.status(400).json({ message: `Statut paiement invalide. Valeurs permises : ${valeursPermises.join(', ')}` });
    }

    const updatedCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statutPaiement },
      { new: true, runValidators: true }
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(updatedCommande);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour du paiement", error: err.message });
  }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const deletedCommande = await Commande.findByIdAndDelete(req.params.id);

    if (!deletedCommande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json({ message: "Commande supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};