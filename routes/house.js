const express = require("express");
const router = express.Router();

const houseController = require("../app/controllers/houseController");
const middlewareController = require("../app/controllers/middlewareController");

router.delete("/:id", houseController.delete);
router.put("/:id", houseController.edit);
router.get("/:id/edit", houseController.formHouseEdit);

router.post("/register", houseController.register);
router.get("/register", middlewareController.verifyToken, houseController.formRegister);

router.get("/:id", houseController.view);

// router.get("/", usersController.get);

module.exports = router;
