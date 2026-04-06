// controllers/commandeController.js

const Commande = require("../models/Commande");
const Offre = require("../models/Offre");

// ➤ Ajouter une commande
// commandeController.js
exports.ajouterCommande = async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const { offreId, client, total } = req.body;

    if (!offreId) {
      return res.status(400).json({ message: "offreId obligatoire" });
    }

    const offre = await Offre.findById(offreId);
    if (!offre) {  // ✅ CORRIGÉ : vérifie l'offre, pas offreId
      return res.status(404).json({ message: "Offre introuvable" });
    }

    const nouvelleCommande = new Commande({
  offre: offre._id,
  client: client || null, // ✅ userId envoyé depuis le frontend
  restaurant: offre.restaurant || null,
  total: total || offre.prix,
  statut: "en_attente",
  statutPaiement: "payé",
  dateCommande: new Date(),
});

    const saved = await nouvelleCommande.save();
    console.log("✅ COMMANDE CRÉÉE:", saved._id);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ ERREUR AJOUT:", err);
    res.status(500).json({ message: err.message });
  }
};


// ➤ Lister toutes les commandes
exports.listerCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("offre", "nom description prix dateDebut disponibilite")
      .populate("client", "nom email")
      .sort({ createdAt: -1 }); // 🔥 IMPORTANT

    console.log("📦 COMMANDES:", commandes.length);

    res.json(commandes);
  } catch (err) {
    console.error("❌ ERREUR LISTE:", err);
    res.status(500).json({ message: err.message });
  }
};

// ➤ Récupérer commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate("offre", "nom description prix")
      .populate("client", "nom email");

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(commande);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Mettre à jour le statut
exports.updateStatut = async (req, res) => {
  try {
    const { statut } = req.body;

    const valeursPermises = ["en_attente", "commandé", "annulé"];
    if (!valeursPermises.includes(statut)) {
      return res.status(400).json({
        message: `Statut invalide: ${valeursPermises.join(", ")}`,
      });
    }

    const updated = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Mettre à jour statut paiement
exports.updateStatutPaiement = async (req, res) => {
  try {
    const { statutPaiement } = req.body;

    const valeursPermises = ["en_attente", "payé", "échoué"];
    if (!valeursPermises.includes(statutPaiement)) {
      return res.status(400).json({
        message: `Statut paiement invalide: ${valeursPermises.join(", ")}`,
      });
    }

    const updated = await Commande.findByIdAndUpdate(
      req.params.id,
      { statutPaiement },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Supprimer commande
exports.deleteCommande = async (req, res) => {
  try {
    const deleted = await Commande.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json({ message: "Commande supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};