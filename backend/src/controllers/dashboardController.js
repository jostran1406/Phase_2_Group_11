const dashboardService = require("../services/dashboardService");

exports.getDashboard = async (req, res) => {

    try {

        const data = await dashboardService.getDashboard();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};