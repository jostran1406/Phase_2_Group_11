#include "esp_network.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <time.h>

static WiFiClient wifiClient;

// NTP config — using UTC+7 (Vietnam) as a default; adjust if the project targets another timezone.
static const char* NTP_SERVER = "pool.ntp.org";
static const long GMT_OFFSET_SEC = 7 * 3600;
static const int DAYLIGHT_OFFSET_SEC = 0;

void esp_network_init() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("[esp_network] Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println();
    Serial.print("[esp_network] Connected, IP: ");
    Serial.println(WiFi.localIP());
}

bool esp_wifi_connected() {
    return WiFi.status() == WL_CONNECTED;
}

void esp_time_init() {
    configTime(GMT_OFFSET_SEC, DAYLIGHT_OFFSET_SEC, NTP_SERVER);
    Serial.print("[esp_network] Syncing time with NTP");
    time_t now = time(nullptr);
    while (now < 1600000000) {
        delay(500);
        Serial.print(".");
        now = time(nullptr);
    }
    Serial.println();
    Serial.println("[esp_network] Time synced");
}

String esp_get_formatted_timestamp() {
    time_t now = time(nullptr);
    if (now < 1600000000) {
        return "";
    }
    struct tm* timeinfo = localtime(&now);
    char buf[20];
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", timeinfo);
    return String(buf);
}

String esp_build_payload(const SensorData& data) {
    StaticJsonDocument<256> doc;
    doc["device_id"] = DEVICE_ID;
    doc["temperature"] = data.temperature;
    doc["humidity"] = data.humidity;
    doc["light"] = data.light;

    String ts = esp_get_formatted_timestamp();
    doc["timestamp"] = ts.length() > 0 ? ts : String(data.timestamp_ms); // fallback if NTP not synced yet

    String payload;
    serializeJson(doc, payload);
    return payload;
}

static bool esp_http_post(const String& payload) {
    if (!esp_wifi_connected()) {
        Serial.println("[esp_network] ERROR: WiFi not connected, cannot send");
        return false;
    }

    HTTPClient http;
    http.begin(wifiClient, BACKEND_URL);
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(payload);
    bool success = (httpCode >= 200 && httpCode < 300);

    if (success) {
        Serial.printf("[esp_network] Send OK (HTTP %d)\n", httpCode);
    } else {
        Serial.printf("[esp_network] Send FAILED (HTTP %d)\n", httpCode);
    }

    http.end();
    return success;
}

bool esp_send_temperature(float value) {
    StaticJsonDocument<128> doc;
    doc["device_id"] = DEVICE_ID;
    doc["temperature"] = value;
    String payload;
    serializeJson(doc, payload);
    return esp_http_post(payload);
}

bool esp_send_humidity(float value) {
    StaticJsonDocument<128> doc;
    doc["device_id"] = DEVICE_ID;
    doc["humidity"] = value;
    String payload;
    serializeJson(doc, payload);
    return esp_http_post(payload);
}

bool esp_send_light(float value) {
    StaticJsonDocument<128> doc;
    doc["device_id"] = DEVICE_ID;
    doc["light"] = value;
    String payload;
    serializeJson(doc, payload);
    return esp_http_post(payload);
}

bool esp_send_data(const SensorData& data) {
    String payload = esp_build_payload(data);
    return esp_http_post(payload);
}
