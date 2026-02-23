// routes/paiementRoutes.js
const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");

router.post("/", paiementController.ajouterPaiement);
router.get("/", paiementController.listerPaiements);
router.get("/:id", paiementController.getPaiementById);
router.delete("/:id", paiementController.deletePaiement);

module.exports = router;