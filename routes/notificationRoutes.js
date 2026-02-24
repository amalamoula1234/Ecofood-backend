// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/", notificationController.ajouterNotification);
router.get("/", notificationController.listerNotifications);
router.get("/:id", notificationController.getNotificationById);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;