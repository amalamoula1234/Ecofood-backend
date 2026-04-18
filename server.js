// ✅ TOUJOURS EN PREMIER
const dotenv = require("dotenv");
dotenv.config();

// Ensuite les autres imports
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅ clé chargée

// ❌ SUPPRIME cette ligne redondante → dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
const userRoutes = require("./routes/userRoutes");
const offreRoutes = require("./routes/offreRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paiementRoutes = require("./routes/paiementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const avisRoutes = require("./routes/avisRoutes");
const statsRoutes = require("./routes/statsRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.post('/create-checkout-session', async (req, res) => {
  const { offre } = req.body;
  if (!offre) return res.status(400).json({ error: "No offre data provided" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: offre.nom,
            description: offre.description,
            images: offre.image ? [`http://localhost:5000/uploads/${offre.image}`] : [],
          },
          unit_amount: Math.round(offre.prix * 100), // ✅ Math.round pour éviter les décimales
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (e) {
    console.warn("Stripe Error (Bypassing for dev):", e.message);
    // Dev fallback if key is invalid
    res.json({ url: 'http://localhost:5173/success' });
  }
});

app.use('/api/user', userRoutes);
app.use('/api/commande', commandeRoutes);
app.use("/api/offre", offreRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/paiement', paiementRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);

app.get('/test', (req, res) => res.send('api ok'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur port ${PORT}`));
