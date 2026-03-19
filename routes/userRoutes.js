///// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");


// ✅ Auth routes

router.post("/register", userController.register);
router.post("/login", userController.login);

// CRUD routes
router.post("/ajouter",protect,authorizeRoles("admin"), userController.ajouterUtilisateur);
router.get("/liste", protect,authorizeRoles("admin"), userController.listerUtilisateurs);
router.get("/:id",protect,authorizeRoles("admin"), userController.getUtilisateurById);
router.put("/:id", protect,userController.updateUtilisateur);
router.delete("/:id",protect,authorizeRoles("admin"), userController.deleteUtilisateur);
router.get("/restaurateur/liste",protect,authorizeRoles("admin"), userController.listerRestaurateurs);


module.exports = router;

