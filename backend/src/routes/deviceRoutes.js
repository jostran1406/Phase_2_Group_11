const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/deviceController");

router.post("/control", deviceController.controlDevice);

module.exports = router;
