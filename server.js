const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ إضافة cors

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors()); // ✅ السماح للـ frontend بالاتصال
app.use(express.json());

// IMPORT ROUTES
const userRoutes = require("./routes/userRoutes");
const offreRoutes = require("./routes/offreRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paiementRoutes = require("./routes/paiementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// USE ROUTES
app.use('/api/user', userRoutes);
app.use('/api/commande', commandeRoutes);
app.use("/api/offre", offreRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/paiement', paiementRoutes);
app.use('/api/notification', notificationRoutes);

app.get('/test', (req, res) => {
  res.send('api ok');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur port ${PORT}`);
});