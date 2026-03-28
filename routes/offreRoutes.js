// routes/offreRoutes.js
const express = require("express");
const router = express.Router();
const offreController = require("../controllers/offreController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/ajouter", offreController.ajouterOffre);
router.get("/liste", offreController.listerOffres);
// TZIDHA fi routes/offreRoutes.js
router.get("/restaurant/:restaurantId",offreController.listerOffresParRestaurant);
router.get("/:id",offreController.getOffreById);
router.put("/:id", offreController.updateOffre);
router.delete("/:id", offreController.deleteOffre);

module.exports = router;
