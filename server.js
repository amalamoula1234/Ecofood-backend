const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ إضافة cors
const path = require("path");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors()); // ✅ السماح للـ frontend بالاتصال
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// IMPORT ROUTES
const userRoutes = require("./routes/userRoutes");
const offreRoutes = require("./routes/offreRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paiementRoutes = require("./routes/paiementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.post('/create-checkout-session', async (req, res) => {
  const { offre } = req.body;

  if (!offre) {
    return res.status(400).json({ error: "No offre data provided" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: offre.nom,
              description: offre.description,
              images: offre.image
                ? [`http://localhost:5000/uploads/${offre.image}`]
                : [],
            },
            unit_amount: offre.prix * 100, // ✅ FIX
          },
          quantity: 1, // ⚠️ مهم
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe Error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

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