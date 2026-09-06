const deviceService = require("../services/deviceService");

exports.controlDevice = async (req, res) => {

    try {

        const result = await deviceService.controlDevice(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};
