// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", protect,authorizeRoles("admin"),restaurantController.ajouterRestaurant);
router.get("/",restaurantController.listerRestaurants);
router.get("/mes-restaurants", protect, restaurantController.getMesRestaurants);
router.get("/categorie/:categorie", restaurantController.getRestaurantsByCategorie);
router.get("/:id", restaurantController.getRestaurantById);
router.put("/:id",protect,authorizeRoles(["admin","restaurateur"]),restaurantController.updateRestaurant);
router.delete("/:id",protect,authorizeRoles(["admin","restaurateur"]),restaurantController.deleteRestaurant);

module.exports = router;