const sensorService = require("../services/sensorService");

exports.uploadSensorData = async (req, res) => {

    try {

        const result = await sensorService.saveSensorData(req.body);

        res.status(200).json({
            status: "success",
            message: "Data received",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};

exports.getLatestSensorData = async (req, res) => {

    try {

        const data = await sensorService.getLatestSensorData();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};

exports.getSensorHistory = async (req, res) => {

    try {

        const data = await sensorService.getSensorHistory();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};
