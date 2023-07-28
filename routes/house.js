const express = require("express");
const router = express.Router();

const houseController = require("../app/controllers/houseController");
const middlewareController = require("../app/controllers/middlewareController");

router.post("/register", houseController.register);
router.get("/register", middlewareController.verifyToken, houseController.formRegister);
router.get("/:user_name", middlewareController.verifyTokenAndCheckUser, houseController.view);

// router.get("/", usersController.get);

module.exports = router;
