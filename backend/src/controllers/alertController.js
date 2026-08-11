const alertService = require("../services/alertService");

exports.getAlerts = async (req, res) => {

    try {

        const data = await alertService.getAlerts();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};
