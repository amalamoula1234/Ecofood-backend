const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Load models
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Offre = require("./models/Offre");
const Commande = require("./models/Commande");

dotenv.config();

const seedTunisDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for Deep Tunisian Seeding (with real images)...");

    // Clear existing collections
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Offre.deleteMany();
    await Commande.deleteMany();
    console.log("Database cleared.");

    // ==========================================
    // 1. Create Users
    // ==========================================
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    const admin = await User.create({
      nom: "Sassi", prenom: "Ahmed", email: "admin@ecofood.tn", mdp: passwordHash, telephone: "71000000", role: "admin",
    });

    const chef1 = await User.create({
      nom: "Ben Ali", prenom: "Mohamed", email: "chef@dareljeld.tn", mdp: passwordHash, telephone: "20111111", role: "restaurateur",
    });

    const chef2 = await User.create({
      nom: "Trabelsi", prenom: "Amel", email: "chef@elali.tn", mdp: passwordHash, telephone: "50222222", role: "restaurateur",
    });

    const client1 = await User.create({
      nom: "Kais", prenom: "Mouna", email: "mouna@test.tn", mdp: passwordHash, telephone: "98333333", role: "client",
    });
    const client2 = await User.create({
      nom: "Mansour", prenom: "Slim", email: "slim@test.tn", mdp: passwordHash, telephone: "22000111", role: "client",
    });

    // ==========================================
    // 2. Create Tunisian Restaurants (Matched with existing uploads)
    // ==========================================
    const rest1 = await Restaurant.create({
      nom: "Dar El Jeld",
      adresse: "5 Rue Dar El Jeld, La Medina, Tunis",
      telephone: "71560916",
      type_cuisine: "Gastronomie Tunisienne",
      photo: "dareljeld.jpg", // ✅ Exists
      restaurateur: chef1._id,
    });

    const rest2 = await Restaurant.create({
      nom: "Restaurant El Ali",
      adresse: "45 Rue Jemaâ Ez-Zitouna, Medina, Tunis",
      telephone: "71328400",
      type_cuisine: "Tradi-Moderne Tunisienne",
      photo: "Restaurant Al Mansour.webp", // ✅ Exists (Placeholder)
      restaurateur: chef2._id,
    });

    const rest3 = await Restaurant.create({
      nom: "Le Roi Bleu",
      adresse: "Sidi Bou Said",
      telephone: "71740000",
      type_cuisine: "Spécialités Marines",
      photo: "leroibleu.jpg", // ✅ Exists
      restaurateur: chef1._id,
    });

    // ==========================================
    // 3. Create Tunisian Food Offers (Matched with existing uploads)
    // ==========================================
    const offre1 = await Offre.create({
      nom: "Couscous Royal à l'Agneau",
      categorie: "Dîner",
      description: "Couscous traditionnel à grain fin, légumes frais de saison, pois chiche et souris d'agneau fondante.",
      prix: 32,
      prixAncien: 45,
      dureeHeures: 3,
      disponibilite: true,
      restaurant: rest1._id,
      image: "koftaTunisienne.jpg" // ✅ Exists (Using similar Tunisian dish)
    });

    const offre2 = await Offre.create({
      nom: "Duo de Briks Tunisiennes",
      categorie: "Entrées",
      description: "Feuilles de malkouka croustillantes farcies au thon/oeuf/câpres.",
      prix: 12,
      prixAncien: 18,
      dureeHeures: 1,
      disponibilite: true,
      restaurant: rest1._id,
      image: "brik.jpg"     // ✅ Exists
    });

    const offre3 = await Offre.create({
      nom: "Ojja aux Merguez Artisanal",
      categorie: "Déjeuner",
      description: "Shakshuka tunisienne pimentée (Ojja) avec saucisses merguez artisanales.",
      prix: 18,
      prixAncien: 25,
      dureeHeures: 2,
      disponibilite: true,
      restaurant: rest2._id,
      image: "Merguez.jpg"  // ✅ Exists
    });

    const offre4 = await Offre.create({
      nom: "Makrouna Sals Piquante",
      categorie: "Déjeuner",
      description: "Pâtes tunisiennes servies avec une sauce tomate épicée, piment rouge et viande.",
      prix: 14,
      prixAncien: 20,
      dureeHeures: 1,
      disponibilite: true,
      restaurant: rest2._id,
      image: "makarouna.jpg" // ✅ Exists
    });

    const offre5 = await Offre.create({
        nom: "Mloukhia Traditionnelle",
        categorie: "Dîner",
        description: "Plat mijoté pendant des heures à base de poudre de corète et viande de boeuf.",
        prix: 25,
        prixAncien: 35,
        dureeHeures: 4,
        disponibilite: true,
        restaurant: rest1._id,
        image: "ملوخية.jpg" // ✅ Exists
      });

    // ==========================================
    // 4. Create Sample Orders
    // ==========================================
    await Commande.create({
      client: client1._id, offre: offre1._id, restaurant: rest1._id, total: 32, statut: "en_attente", statutPaiement: "payé"
    });
    await Commande.create({
      client: client2._id, offre: offre3._id, restaurant: rest2._id, total: 18, statut: "commandé", statutPaiement: "payé"
    });

    console.log("✅ Deep Tunisian Seeding with REAL IMAGES completed successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error while seeding:", err);
    mongoose.connection.close();
  }
};

seedTunisDB();
