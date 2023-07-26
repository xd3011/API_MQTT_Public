const middlewareController = require("../app/controllers/middlewareController");
const userController = require("../app/controllers/userController");

const router = require("express").Router();

// Get All User
router.get("/", middlewareController.verifyToken, userController.getAllUser);

// Delete User
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;
