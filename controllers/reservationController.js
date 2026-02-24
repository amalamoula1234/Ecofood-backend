const Reservation = require("../models/Reservation");

// Ajouter une réservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json({ success: true, reservation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Lister toutes les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("offre");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une réservation par ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("offre");
    if (!reservation) return res.status(404).json({ success: false, message: "Réservation non trouvée" });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Modifier une réservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ success: false, message: "Réservation non trouvée" });
    res.json({ success: true, reservation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: "Réservation non trouvée" });
    res.json({ success: true, message: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};