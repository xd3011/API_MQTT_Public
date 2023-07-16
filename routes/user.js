const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/login", userController.formLogin);
router.get("/register", userController.formRegister);

// router.get("/", usersController.get);

module.exports = router;
