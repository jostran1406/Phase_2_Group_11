exports.controlDevice = (data) => {

    return new Promise((resolve) => {

        console.log("Command to ESP8266:");

        console.log({
            command: "control",
            device: data.device,
            status: data.status
        });

        resolve({
            status: "success",
            message: "Command sent"
        });

    });

};

