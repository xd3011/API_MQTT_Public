const express = require("express");
const router = express.Router();

const roomController = require("../app/controllers/roomController");
const middlewareController = require("../app/controllers/middlewareController");

router.post("/register", roomController.register);
router.get("/register", middlewareController.verifyToken, roomController.formRoomRegister);
router.put("/:id", roomController.edit);
router.get("/:id/edit", roomController.formRoomEdit);
router.delete("/:id", roomController.delete);
router.get("/:slug", middlewareController.verifyToken, roomController.view);

// router.get("/", usersController.get);

module.exports = router;
