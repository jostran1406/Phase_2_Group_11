#ifndef ESP_NETWORK_H
#define ESP_NETWORK_H

#include <Arduino.h>
#include "esp_sensors.h"

#define WIFI_SSID        "YOUR_WIFI_SSID"
#define WIFI_PASSWORD    "YOUR_WIFI_PASSWORD"

/**
 * Endpoint confirmed from the Backend API doc (SP1-09):
 * POST /api/sensor/upload
 * Body: { "device_id", "temperature", "humidity", "light", "timestamp" }
 *
 * With this architecture (System Architecture / SP1-08 diagram), ESP8266
 * reads Temperature/Humidity/Light directly, so all 3 fields required by
 * the Backend schema are available — no schema mismatch, unlike the
 * earlier UART-based design.
 */
#define BACKEND_URL      "http://<backend-ip>:<port>/api/sensor/upload"

#define DEVICE_ID        "NODE_01"   ///< Matches the example device_id used in the Backend API doc

/**
 * NOTE: In this architecture, ESP8266 does NOT relay Control Commands.
 * Per the System Architecture diagram, the Backend Server sends the
 * "Control Command" directly to the STM32 Control Node — ESP8266 is only
 * a Monitoring Node (Environmental Sensors -> ESP8266 -> Backend).
 * There is therefore no command-polling function in this module.
 */

/** @brief Initialize WiFi. Call once in setup(). */
void esp_network_init();

/** @brief Check current WiFi connection status. @return true if connected. */
bool esp_wifi_connected();

/**
 * @brief Initialize NTP time sync so timestamps can be formatted as
 *        "YYYY-MM-DD HH:mm:ss", matching the format used in the Backend
 *        API examples (e.g. "2026-08-05 10:30:00"). Call once after WiFi
 *        is connected.
 */
void esp_time_init();

/**
 * @brief Get the current time formatted as "YYYY-MM-DD HH:mm:ss".
 * @return Formatted timestamp string, or "" if NTP time is not yet synced.
 */
String esp_get_formatted_timestamp();

/**
 * @brief Build the JSON payload for POST /api/sensor/upload, matching the
 *        Backend schema exactly (device_id, temperature, humidity, light,
 *        timestamp).
 * @param data Sensor data read directly by ESP8266 via esp_read_all().
 * @return JSON string.
 */
String esp_build_payload(const SensorData& data);

/** @brief Send temperature alone. @param value Value (°C). @return true if successful. */
bool esp_send_temperature(float value);
/** @brief Send humidity alone. @param value Value (%). @return true if successful. */
bool esp_send_humidity(float value);
/** @brief Send light alone. @param value Raw ADC or Lux value. @return true if successful. */
bool esp_send_light(float value);

/**
 * @brief Send the full SensorData to the Backend in a single JSON request
 *        (recommended over calling the 3 individual send functions).
 * @param data Data read directly by ESP8266.
 * @return true if sent successfully.
 */
bool esp_send_data(const SensorData& data);

#endif // ESP_NETWORK_H
