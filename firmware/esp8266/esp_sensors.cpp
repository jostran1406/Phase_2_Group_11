#include "esp_sensors.h"
#include <DHT.h>

static DHT dht(PIN_DHT, DHT_TYPE);

void esp_sensors_init() {
    dht.begin();
    pinMode(PIN_LDR, INPUT);
    Serial.println("[esp_sensors] Sensor interface initialized (GPIO/I2C)");
}

float esp_read_temperature() {
    float t = dht.readTemperature();
    if (isnan(t)) {
        Serial.println("[esp_sensors] ERROR: failed to read temperature");
    }
    return t;
}

float esp_read_humidity() {
    float h = dht.readHumidity();
    if (isnan(h)) {
        Serial.println("[esp_sensors] ERROR: failed to read humidity");
    }
    return h;
}

float esp_read_light() {
    int raw = analogRead(PIN_LDR);
    if (raw < 0 || raw > 1023) {
        Serial.println("[esp_sensors] ERROR: light reading out of range");
        return -1;
    }
    return (float)raw;
}

SensorData esp_read_all() {
    SensorData data;
    data.temperature = esp_read_temperature();
    data.humidity = esp_read_humidity();
    data.light = esp_read_light();
    data.timestamp_ms = millis();
    data.valid = !isnan(data.temperature) && !isnan(data.humidity) && data.light >= 0;
    return data;
}
