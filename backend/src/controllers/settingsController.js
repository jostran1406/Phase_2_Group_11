const settingsService = require("../services/settingsService");

exports.getSettings = async (req, res) => {

    try {

        const data = await settingsService.getSettings();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};

exports.updateSettings = async (req, res) => {

    try {

        await settingsService.updateSettings(req.body);

        res.status(200).json({
            status: "success",
            message: "Settings updated"
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};
