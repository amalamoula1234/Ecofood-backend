// controllers/reservationController.js
const Reservation = require("../models/Reservation");

// Ajouter une réservation
exports.ajouterReservation = async (req, res) => {
  try {
    const nouvelleReservation = new Reservation(req.body);
    await nouvelleReservation.save();
    res.status(201).json(nouvelleReservation);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

// Lister toutes les réservations
exports.listerReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("offre", "description prix dateDebut dateFin disponibilite");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une réservation par ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("offre", "description prix dateDebut dateFin disponibilite");

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json({ message: "Réservation supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};