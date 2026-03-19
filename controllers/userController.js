
// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
const { nom, prenom, email, mdp, telephone, role } = req.body;

    // 1️⃣ vérifier ken email deja mawjouda
    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // 2️⃣ crypter password
    const salt = await bcrypt.genSalt(10);
    const hashedmdp = await bcrypt.hash(mdp, salt);

    // 3️⃣ créer user
   const newUser = new User({ nom, prenom, email, mdp: hashedmdp, telephone, role });

    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });

  } catch (error) {
    res.status(500).json({ message: "Erreur register", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, mdp } = req.body;

    // 1️⃣ vérifier email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email incorrect" });
    }

    // 2️⃣ vérifier password
    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // 3️⃣ créer token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur login", error: error.message });
  }
};



// Ajouter un utilisateur (admin uniquement)
exports.ajouterUtilisateur = async (req, res) => {
  try {
    const nouvelUser = new User(req.body);
    await nouvelUser.save();
    res.status(201).json(nouvelUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur d’ajout", error: err.message });
  }
};



// Récupérer un utilisateur par ID
exports.listerUtilisateurs = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUtilisateur = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // retourne le document mis à jour
        runValidators: true // applique les validations du schema
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUtilisateur = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};
exports.listerRestaurateurs = async (req, res) => {
  try {
    const restaurateurs = await User.find({ role: "restaurateur" }).select("_id nom email");
    res.json(restaurateurs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

