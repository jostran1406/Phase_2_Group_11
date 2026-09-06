const db = require("../config/database");

exports.saveSensorData = (sensorData) => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        INSERT INTO sensor_data
        (node_id, temperature, humidity, light)
        VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                sensorData.node_id,
                sensorData.temperature,
                sensorData.humidity,
                sensorData.light
            ],
            (err, result) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }

            }
        );

    });

};

exports.getLatestSensorData = () => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        SELECT *
        FROM sensor_data
        ORDER BY id DESC
        LIMIT 1
        `;

        db.query(sql, (err, results) => {

            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }

        });

    });

};

exports.getSensorHistory = () => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        SELECT *
        FROM sensor_data
        ORDER BY timestamp DESC
        `;

        db.query(sql, (err, results) => {

            if (err) {
                reject(err);
            } else {
                resolve(results);
            }

        });

    });

};

