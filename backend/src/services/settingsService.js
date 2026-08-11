const db = require("../config/database");

exports.getSettings = () => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        SELECT *
        FROM settings
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

exports.updateSettings = (settings) => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        UPDATE settings
        SET
            temperature_threshold = ?,
            humidity_threshold = ?,
            light_threshold = ?
        WHERE id = 1
        `;

        db.query(
            sql,
            [
                settings.temperature_threshold,
                settings.humidity_threshold,
                settings.light_threshold
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

