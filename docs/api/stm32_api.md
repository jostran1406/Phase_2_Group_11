# STM32 API Reference

This document lists the internal APIs implemented on the STM32F401RE microcontroller for the "IoT Laboratory Monitoring System" project."

## 1. Sensor APIs

Functions for processing and reading environmental data.

### `BMP280_ReadTemperature()`
*   **Function:** Reads the temperature parameters from the BMP280 sensor.
*   **Returns:** `float` - Temperature value.

### `BH1750_ReadLight()`
*   **Function:** Reads the light parameters (Lux) from the BH1750 sensor.
*   **Returns:** `float` - Illuminance value.

### `MQ135_ReadAirQuality()`
*   **Function:** Evaluates the relative air pollution levels in the laboratory.
*   **Logic Processing:** Classifies the state into Normal – Warning – Danger based on the calibration process.
*   **Note:** Do not use this function to accurately measure air quality in ppm units.

## 2. Communication APIs

### `UART_SendToESP()`
*   **Function:** Transmits the collected sensor data via UART protocol to the ESP8266 module.
*   **Parameters:** `payload` - The data string to be sent.

## 3. Control APIs

### `Relay_ControlDevice()`
*   **Function:** Receives commands from the Server when data exceeds thresholds to control the Relay.
*   **Controlled Devices:** Ventilation fan, lighting, exhaust fan, warning buzzer.
*   **State:** Turns the device On/Off based on the input parameter.

### `Alert_LocalTrigger()`
*   **Function:** Activates local alerts via LED and Buzzer upon receiving commands.