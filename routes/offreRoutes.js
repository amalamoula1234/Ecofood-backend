// routes/offreRoutes.js
const express = require("express");
const router = express.Router();
const offreController = require("../controllers/offreController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/ajouter",  protect, authorizeRoles("admin"), offreController.ajouterOffre);
router.get("/liste",protect, offreController.listerOffres);
// TZIDHA fi routes/offreRoutes.js
router.get("/restaurant/:restaurantId", protect,authorizeRoles(["admin","restaurateur"]),offreController.listerOffresParRestaurant);
router.get("/:id",protect, offreController.getOffreById);
router.put("/:id", protect, authorizeRoles("admin"), offreController.updateOffre);
router.delete("/:id",  protect, authorizeRoles("admin"),offreController.deleteOffre);

module.exports = router;