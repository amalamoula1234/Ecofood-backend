const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

// ✅ CREATE COMMANDE
router.post("/", commandeController.ajouterCommande);

// ✅ GET ALL COMMANDES
router.get("/liste", commandeController.listerCommandes);

// ✅ GET BY ID
router.get("/:id", commandeController.getCommandeById);

// ✅ UPDATE STATUT
router.patch("/:id/statut", commandeController.updateStatut);

// ✅ UPDATE STATUT PAIEMENT
router.patch("/:id/paiement", commandeController.updateStatutPaiement);

// ✅ DELETE
router.delete("/:id", commandeController.deleteCommande);

module.exports = router;