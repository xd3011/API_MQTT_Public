const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/authController");
const middlewareController = require("../app/controllers/middlewareController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", middlewareController.verifyToken, authController.logout);

router.get("/login", authController.formLogin);
router.get("/register", authController.formRegister);

// router.get("/", authController.get);

module.exports = router;
