// routes/paiementRoutes.js
const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", protect, paiementController.ajouterPaiement);
router.get("/lister", protect, authorizeRoles(["admin", "restaurateur"]), paiementController.listerPaiements);
router.get("/:id", protect, paiementController.getPaiementById);
router.delete("/:id", protect, authorizeRoles(["admin"]), paiementController.deletePaiement);

module.exports = router;