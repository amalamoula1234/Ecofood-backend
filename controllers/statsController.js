const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Commande = require("../models/Commande");
const Offre = require("../models/Offre");

exports.getAdminStats = async (req, res) => {
  try {
    // 1. User counts by role
    const users = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    // 2. Total Restaurants
    const restaurantCount = await Restaurant.countDocuments();

    // 3. Total Offers
    const offerCount = await Offre.countDocuments();

    // 4. Revenue and Order Status distribution
    const orders = await Commande.aggregate([
      {
        $group: {
          _id: "$statut",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$total" }
        }
      }
    ]);

    // 5. Monthly Revenue (Last 6 months)
    const monthlyRevenue = await Commande.aggregate([
      {
        $match: { 
          statut: "commandé", // Only count confirmed orders for revenue
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) } 
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format results
    const stats = {
      users: {
        admin: users.find(u => u._id === "admin")?.count || 0,
        client: users.find(u => u._id === "client")?.count || 0,
        restaurateur: users.find(u => u._id === "restaurateur")?.count || 0,
        total: users.reduce((acc, curr) => acc + curr.count, 0)
      },
      restaurants: restaurantCount,
      offers: offerCount,
      orders: {
          en_attente: orders.find(o => o._id === "en_attente")?.count || 0,
          commandé: orders.find(o => o._id === "commandé")?.count || 0,
          annulé: orders.find(o => o._id === "annulé")?.count || 0,
          total: orders.reduce((acc, curr) => acc + curr.count, 0)
      },
      totalRevenue: orders.find(o => o._id === "commandé")?.totalRevenue || 0,
      monthlyRevenue: monthlyRevenue.map(m => ({ 
          month: new Date(0, m._id - 1).toLocaleString('default', { month: 'short' }), 
          revenue: m.revenue 
      }))
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};

exports.getRestaurateurStats = async (req, res) => {
  try {
    const restaurateurId = req.user.id;

    // 1. Get Restaurateur's restaurants
    const restaurants = await Restaurant.find({ restaurateur: restaurateurId });
    const restaurantIds = restaurants.map(r => r._id);

    // 2. Count Total Offers for these restaurants
    const offerCount = await Offre.countDocuments({ restaurant: { $in: restaurantIds } });

    // 3. Stats from Commandes related to these restaurants
    const orders = await Commande.aggregate([
      { $match: { restaurant: { $in: restaurantIds } } },
      {
        $group: {
          _id: "$statut",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$total" }
        }
      }
    ]);

    // 4. Monthly Revenue (Last 6 months) for these restaurants
    const monthlyRevenue = await Commande.aggregate([
      {
        $match: { 
          restaurant: { $in: restaurantIds },
          statut: "commandé", 
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) } 
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format results
    const stats = {
      restaurants: restaurantIds.length,
      offers: offerCount,
      orders: {
          en_attente: orders.find(o => o._id === "en_attente")?.count || 0,
          commandé: orders.find(o => o._id === "commandé")?.count || 0,
          annulé: orders.find(o => o._id === "annulé")?.count || 0,
          total: orders.reduce((acc, curr) => acc + curr.count, 0)
      },
      totalRevenue: orders.find(o => o._id === "commandé")?.totalRevenue || 0,
      monthlyRevenue: monthlyRevenue.map(m => ({ 
          month: new Date(0, m._id - 1).toLocaleString('default', { month: 'short' }), 
          revenue: m.revenue 
      }))
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurateur stats", error: err.message });
  }
};
