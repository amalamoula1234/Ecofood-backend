// routes/commandeRoutes.js
const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");


router.post("/", protect, authorizeRoles("user"),commandeController.ajouterCommande);
router.get("/liste", protect, authorizeRoles("restaurateur"),commandeController.listerCommandes);
router.get("/:id",protect, commandeController.getCommandeById);
router.patch("/:id/statut", protect,authorizeRoles("admin", "restaurateur"), commandeController.updateStatut);
router.patch("/:id/paiement",  protect,authorizeRoles(["admin", "restaurateur"]),commandeController.updateStatutPaiement);
router.delete("/:id", protect, authorizeRoles("restaurateur"), commandeController.deleteCommande);

module.exports = router;