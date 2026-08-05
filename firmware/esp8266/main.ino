/**
 * @file main.ino
 * @brief ESP8266 Monitoring Node — reads Temperature/Humidity/Light directly
 *        (Environmental Sensors layer, System Architecture SP1-08) and
 *        uploads to the Backend via POST /api/sensor/upload.
 *        No UART link to STM32: the Backend sends Control Commands
 *        directly to the STM32 Control Node, independent of this device.
 */

#include "esp_sensors.h"
#include "esp_network.h"

const unsigned long READ_INTERVAL_MS = 5000; ///< Sensor read/upload cycle
const int MAX_RETRY = 3;

void setup() {
    Serial.begin(115200);
    esp_sensors_init();
    esp_network_init();
    esp_time_init();
}

void loop() {
    if (!esp_wifi_connected()) {
        Serial.println("[main] WiFi lost, reconnecting...");
        esp_network_init();
    }

    SensorData data = esp_read_all();

    if (!data.valid) {
        Serial.println("[main] Sensor read invalid, skipping this cycle");
        delay(READ_INTERVAL_MS);
        return;
    }

    bool sent = false;
    for (int attempt = 1; attempt <= MAX_RETRY && !sent; attempt++) {
        sent = esp_send_data(data);
        if (!sent) {
            Serial.printf("[main] Send attempt %d/%d failed, retrying...\n", attempt, MAX_RETRY);
            delay(1000);
        }
    }

    if (!sent) {
        Serial.println("[main] ERROR: send failed after max retries, data dropped this cycle");
    }

    delay(READ_INTERVAL_MS);
}
