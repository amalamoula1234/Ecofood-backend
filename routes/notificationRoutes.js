// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, notificationController.ajouterNotification);
router.get("/", protect, notificationController.listerNotifications);
router.patch("/:id/lu", protect, notificationController.marquerCommeLu);
router.get("/:id", protect, notificationController.getNotificationById);
router.delete("/:id", protect, notificationController.deleteNotification);

module.exports = router;