const express = require("express");
const router = express.Router();

const deviceController = require("../app/controllers/deviceController");
const middlewareController = require("../app/controllers/middlewareController");

router.post("/register", deviceController.register);
router.get("/register", middlewareController.verifyToken, deviceController.formDeviceRegister);

router.put("/:id", deviceController.edit);
router.get("/:id/edit", deviceController.formDeviceEdit);

router.delete("/:id", deviceController.delete);
router.get("/:slug", middlewareController.verifyToken, deviceController.view);

module.exports = router;
