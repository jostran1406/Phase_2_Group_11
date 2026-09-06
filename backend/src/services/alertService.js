const db = require("../config/database");

exports.getAlerts = () => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        SELECT *
        FROM alerts
        ORDER BY time DESC
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
