const express = require("express");
const router = express.Router();

const sensorController = require("../controllers/sensorController");

router.post("/upload", sensorController.uploadSensorData);

router.get("/latest", sensorController.getLatestSensorData);

router.get("/history", sensorController.getSensorHistory);

module.exports = router;
