// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/", restaurantController.ajouterRestaurant);
router.get("/", restaurantController.listerRestaurants);
router.get("/categorie/:categorie", restaurantController.getRestaurantsByCategorie);
router.get("/:id", restaurantController.getRestaurantById);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;