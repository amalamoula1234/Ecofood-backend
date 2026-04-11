const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// CRUD réservations
router.post("/", protect, reservationController.createReservation);       // Ajouter (Client)
router.get("/", protect, authorizeRoles(["admin", "restaurateur"]), reservationController.getAllReservations);      // Lister toutes
router.get("/:id", protect, reservationController.getReservationById);   // Récupérer par ID
router.put("/:id", protect, reservationController.updateReservation);    // Modifier
router.delete("/:id", protect, reservationController.deleteReservation); // Supprimer

module.exports = router;