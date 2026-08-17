const db = require("../config/database");

exports.getDashboard = () => {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT *
        FROM sensor_data
        ORDER BY timestamp DESC
        LIMIT 1
        `;

        db.query(sql, (err, result) => {

            if (err) {
                reject(err);
                return;
            }

            const latest = result[0];

            resolve({
                temperature: latest.temperature,
                humidity: latest.humidity,
                light: latest.light,
                fan_status: false,
                light_status: false,
                buzzer_status: false,
                alert_count: 0,
                last_update: latest.timestamp
            });

        });

    });

};