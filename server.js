const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// IMPORTANT ✅ importer les routes

const userRoutes = require("./routes/userRoutes");
const offreRoutes = require("./routes/offreRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paiementRoutes = require("./routes/paiementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


// utiliser les routes

app.use('/api/user', userRoutes);
app.use('/api/commande', commandeRoutes);
app.use("/api/offre", offreRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/paiement', paiementRoutes);
app.use('/api/notification', notificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur port ${PORT}`);
});