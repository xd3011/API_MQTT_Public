const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/fieldController");

router.post("/", siteController.index);

router.get("/", siteController.get);

module.exports = router;
