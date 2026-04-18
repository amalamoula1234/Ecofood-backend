const Contact = require("../models/Contact");

// ➤ Envoyer un message
exports.envoyerMessage = async (req, res) => {
  try {
    const { nom, email, telephone, message } = req.body;

    if (!nom || !email || !message) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    const nouveauMessage = new Contact({
      nom,
      email,
      telephone,
      message
    });

    await nouveauMessage.save();
    res.status(201).json({ message: "Message envoyé avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message", error: err.message });
  }
};

// ➤ Récupérer tous les messages (Admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des messages", error: err.message });
  }
};
