// routes/commandeRoutes.js
const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

router.post("/", commandeController.ajouterCommande);
router.get("/", commandeController.listerCommandes);
router.get("/:id", commandeController.getCommandeById);
router.patch("/:id/statut", commandeController.updateStatut);
router.patch("/:id/paiement", commandeController.updateStatutPaiement);
router.delete("/:id", commandeController.deleteCommande);

module.exports = router;