const express = require("express");
const router = express.Router();

const houseController = require("../app/controllers/houseController");

router.post("/register", houseController.register);
router.get("/view/:slug", houseController.view);

// router.get("/", usersController.get);

module.exports = router;
