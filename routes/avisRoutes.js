const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avisController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Routes Publiques
router.get("/restaurant/:restaurantId", avisController.listerAvisPublic);

// Routes Clients (Connectés)
router.post("/", protect, authorizeRoles(["client", "admin", "restaurateur"]), avisController.ajouterAvis);

// Routes Admin (Modération)
router.get("/admin/tous", protect, authorizeRoles("admin"), avisController.listerTousLesAvisAdmin);
router.patch("/admin/:id/statut", protect, authorizeRoles("admin"), avisController.modifierStatutAvis);
router.delete("/admin/:id", protect, authorizeRoles("admin"), avisController.supprimerAvis);

module.exports = router;
