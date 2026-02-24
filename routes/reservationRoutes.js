const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// CRUD réservations
router.post("/", reservationController.createReservation);       // Ajouter
router.get("/", reservationController.getAllReservations);      // Lister toutes
router.get("/:id", reservationController.getReservationById);   // Récupérer par ID
router.put("/:id", reservationController.updateReservation);    // Modifier
router.delete("/:id", reservationController.deleteReservation); // Supprimer

module.exports = router;