// routes/offreRoutes.js
const express = require("express");
const router = express.Router();
const offreController = require("../controllers/offreController");

router.post("/ajouter", offreController.ajouterOffre);
router.get("/liste", offreController.listerOffres);
router.get("/:id", offreController.getOffreById);
router.put("/:id", offreController.updateOffre);
router.delete("/:id", offreController.deleteOffre);

module.exports = router;