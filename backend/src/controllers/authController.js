const authService = require("../services/authService");

exports.register = async (req, res) => {

    try {

        await authService.register(req.body);

        res.status(201).json({
            status: "success",
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};

exports.login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};