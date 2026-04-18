const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Public route to send a message
router.post("/", contactController.envoyerMessage);

// Admin route to see messages
router.get("/", protect, authorizeRoles("admin"), contactController.getMessages);

module.exports = router;
