const dashboardRoutes = require("./routes/dashboardRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const alertRoutes = require("./routes/alertRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const express = require("express");
require("./config/database");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sensor", sensorRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "IoT Backend Running"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});