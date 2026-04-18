const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/admin", protect, authorizeRoles("admin"), statsController.getAdminStats);
router.get("/restaurateur", protect, authorizeRoles("restaurateur"), statsController.getRestaurateurStats);

module.exports = router;
