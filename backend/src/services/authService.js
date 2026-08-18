const db = require("../config/database");

exports.register = (user) => {

    return new Promise((resolve, reject) => {

        const checkSql =
        `
        SELECT *
        FROM users
        WHERE username = ?
        `;

        db.query(checkSql, [user.username], (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            if (results.length > 0) {

                reject(new Error("Username already exists"));

                return;
            }

            const insertSql =
            `
            INSERT INTO users(username,password)
            VALUES(?,?)
            `;

            db.query(
                insertSql,
                [
                    user.username,
                    user.password
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

    });

};

exports.login = (user) => {

    return new Promise((resolve, reject) => {

        const sql =
        `
        SELECT *
        FROM users
        WHERE username = ?
        AND password = ?
        `;

        db.query(
            sql,
            [
                user.username,
                user.password
            ],
            (err, results) => {

                if (err) {
                    reject(err);
                    return;
                }

                if (results.length === 0) {

                    resolve({
                        status: "error",
                        message: "Invalid username or password"
                    });

                } else {

                    resolve({
                        status: "success",
                        message: "Login successful"
                    });

                }

            }
        );

    });

};

