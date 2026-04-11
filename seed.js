const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Load models
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Offre = require("./models/Offre");

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for Seeding...");

    // Clear existing collections completely
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Offre.deleteMany();
    console.log("Database cleared.");

    // ==========================================
    // 1. Create Users
    // ==========================================
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    const admin = await User.create({
      nom: "Admin",
      prenom: "Principal",
      email: "admin@ecofood.com",
      mdp: passwordHash,
      telephone: "00000000",
      role: "admin",
    });

    const chef1 = await User.create({
      nom: "Dupont",
      prenom: "Jean",
      email: "chef@gourmet.com",
      mdp: passwordHash,
      telephone: "11111111",
      role: "restaurateur",
    });

    const chef2 = await User.create({
      nom: "Suzuki",
      prenom: "Kenji",
      email: "chef@sushi.com",
      mdp: passwordHash,
      telephone: "22222222",
      role: "restaurateur",
    });
    
    const client = await User.create({
      nom: "Martin",
      prenom: "Alice",
      email: "client@test.com",
      mdp: passwordHash,
      telephone: "99999999",
      role: "client",
    });

    console.log("Users created.");

    // ==========================================
    // 2. Create Restaurants
    // ==========================================
    const rest1 = await Restaurant.create({
      nom: "Le Gourmet Parisien",
      adresse: "15 Rue de Rivoli, Paris",
      telephone: "0142334455",
      type_cuisine: "Française",
      photo: "gourmet.jpg", // Mock image name, you might need to upload proper images
      restaurateur: chef1._id,
    });

    const rest2 = await Restaurant.create({
      nom: "Sushi Master",
      adresse: "8 Boulevard Haussmann, Paris",
      telephone: "0177889900",
      type_cuisine: "Japonaise",
      photo: "sushi.jpg",
      restaurateur: chef2._id,
    });

    console.log("Restaurants created.");

    // ==========================================
    // 3. Create Offres
    // ==========================================
    await Offre.create({
      nom: "Menu Dégustation",
      categorie: "Dîner",
      description: "Un délicieux menu dégustation 3 services incluant entrée, plat et dessert du Chef.",
      prix: 45,
      prixAncien: 60,
      dureeHeures: 2,
      disponibilite: true,
      restaurant: rest1._id,
      image: "",
    });

    await Offre.create({
      nom: "Box Sushi 24 Pièces",
      categorie: "Déjeuner",
      description: "Assortiment premium de 24 pièces : saumon, thon, avocat et fromages.",
      prix: 25,
      prixAncien: 35,
      dureeHeures: 1,
      disponibilite: true,
      restaurant: rest2._id,
      image: "",
    });

    await Offre.create({
      nom: "Petit-Déjeuner Royal",
      categorie: "Petit-déjeuner",
      description: "Croissants, pain au chocolat, confiture Artisanale et café noir préparé avec soin.",
      prix: 15,
      prixAncien: 20,
      dureeHeures: 1,
      disponibilite: true,
      restaurant: rest1._id,
      image: "",
    });

    console.log("Offres created.");
    console.log("✅ Seeding completed successfully!");
    
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error while seeding:", err);
    mongoose.connection.close();
  }
};

seedDB();
