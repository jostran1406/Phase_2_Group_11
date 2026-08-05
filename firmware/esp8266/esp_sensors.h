#ifndef ESP_SENSORS_H
#define ESP_SENSORS_H

#include <Arduino.h>

/**
 * @brief Pin configuration for directly-attached sensors.
 *        Adjust to match the actual wiring on the board.
 */
#define PIN_DHT       D4    ///< Data pin of the DHT sensor (Temperature + Humidity)
#define DHT_TYPE      DHT22 ///< Change to DHT11 if that's the physical sensor used
#define PIN_LDR       A0    ///< Analog pin of the light sensor (LDR). Use I2C BH1750 instead if available.

/**
 * @struct SensorData
 * @brief Sensor readings taken directly by ESP8266 (Environmental Sensors
 *        layer in the System Architecture: Temperature, Humidity, Light —
 *        matches the Backend's SENSOR_DATA schema exactly).
 */
struct SensorData {
    float temperature;          ///< °C. NAN if the read failed.
    float humidity;               ///< %. NAN if the read failed.
    float light;                    ///< Raw ADC (0-1023) if using LDR, or Lux if using BH1750.
    bool  valid;                     ///< true if all readings succeeded.
    unsigned long timestamp_ms; ///< millis() at the time of reading.
};

/**
 * @brief Initialize the sensor interfaces (GPIO/I2C/OneWire). Call once in setup().
 */
void esp_sensors_init();

/**
 * @brief Read the temperature from the DHT sensor.
 * @return Temperature in °C, or NAN if the read failed.
 */
float esp_read_temperature();

/**
 * @brief Read the relative humidity from the DHT sensor.
 * @return Humidity in %, or NAN if the read failed.
 */
float esp_read_humidity();

/**
 * @brief Read the light level from the LDR (analog).
 * @return Raw ADC value (0-1023), or -1 if out of range/failed.
 */
float esp_read_light();

/**
 * @brief Read all 3 sensors in a single call, validate, and package the
 *        result into a SensorData struct.
 * @return SensorData with valid=false if any reading failed.
 */
SensorData esp_read_all();

#endif // ESP_SENSORS_H
