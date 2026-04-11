// controllers/notificationController.js
const Notification = require("../models/Notification");

// Ajouter une notification
exports.ajouterNotification = async (req, res) => {
  try {
    const nouvelleNotification = new Notification(req.body);
    await nouvelleNotification.save();
    res.status(201).json(nouvelleNotification);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

// Lister MES notifications (Restaurateur ou Admin)
exports.listerNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ destinataire: req.user.id })
      .sort({ dateEnvoi: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Marquer comme lu
exports.marquerCommeLu = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { lu: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une notification par ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification non trouvée" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Supprimer une notification
exports.deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification non trouvée" });
    }

    res.json({ message: "Notification supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};

