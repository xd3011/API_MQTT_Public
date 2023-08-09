const express = require("express");
const router = express.Router();

const subDeviceController = require("../app/controllers/subDeviceController");
const middlewareController = require("../app/controllers/middlewareController");

router.post("/register", subDeviceController.register);
router.get("/register", middlewareController.verifyToken, subDeviceController.formSubDeviceRegister);

router.post("/:id/changeState", subDeviceController.changeState);

// API using with device
router.get("/:id/getState", subDeviceController.getState);
// router.put("/:id", subDeviceController.edit);
// router.get("/:id/edit", subDeviceController.formSubDeviceEdit);

// router.delete("/:id", subDeviceController.delete);
router.get("/:slug", middlewareController.verifyToken, subDeviceController.view);

module.exports = router;
