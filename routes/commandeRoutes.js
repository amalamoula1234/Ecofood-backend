const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// ✅ CREATE COMMANDE
router.post("/", protect, commandeController.ajouterCommande);

// ✅ GET ALL COMMANDES (Admin only)
router.get("/liste", protect, authorizeRoles(["admin"]), commandeController.listerCommandes);

// ✅ GET COMMANDES FOR LOGGED IN RESTAURATEUR
router.get("/mes-commandes", protect, authorizeRoles(["restaurateur", "admin"]), commandeController.getMesCommandes);

// ✅ GET BY ID
router.get("/:id", protect, commandeController.getCommandeById);

// ✅ UPDATE STATUT (Admin, Restaurateur)
router.patch("/:id/statut", protect, authorizeRoles(["admin", "restaurateur"]), commandeController.updateStatut);

// ✅ UPDATE STATUT PAIEMENT (Admin, Restaurateur)
router.patch("/:id/paiement", protect, authorizeRoles(["admin", "restaurateur"]), commandeController.updateStatutPaiement);

// ✅ DELETE (Admin)
router.delete("/:id", protect, authorizeRoles(["admin"]), commandeController.deleteCommande);

module.exports = router;