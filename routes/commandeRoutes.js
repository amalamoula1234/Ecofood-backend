const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController"); 

// Ajouter une commande
router.post("/", commandeController.ajouterCommande);

// Lister toutes les commandes
router.get("/liste", commandeController.listerCommandes);

// Récupérer commande par ID
router.get("/:id", commandeController.getCommandeById);

// Mettre à jour le statut
router.patch("/:id/statut", commandeController.updateStatut);

// Mettre à jour le statut paiement
router.patch("/:id/paiement", commandeController.updateStatutPaiement);

// Supprimer commande
router.delete("/:id", commandeController.deleteCommande);

module.exports = router;