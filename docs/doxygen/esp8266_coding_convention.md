# ESP8266 Coding Convention & Doxygen Guidelines

## 1. Function Naming Convention

| Group | Prefix | Example |
|---|---|---|
| Read a sensor directly | `esp_read_*` | `esp_read_temperature()`, `esp_read_humidity()`, `esp_read_light()`, `esp_read_all()` |
| Send data to the Backend (WiFi) | `esp_send_*` | `esp_send_temperature()`, `esp_send_data()` |
| Build a data payload | `esp_build_*` | `esp_build_payload()` |
| Initialize a module | `esp_<module>_init` | `esp_sensors_init()`, `esp_network_init()`, `esp_time_init()` |

## 2. Sensor Data Set 
| Sensor | Field | Unit |
|---|---|---|
| DHT (temperature) | `SensorData.temperature` | °C |
| DHT (humidity) | `SensorData.humidity` | % |
| LDR / BH1750 | `SensorData.light` | raw ADC or Lux |

## 3. Return Value Convention
- `esp_read_*()`: returns the measured value (`float`), `NAN`/`-1` on failure — no exceptions.
- `esp_read_all()`: returns `SensorData`, `valid=false` if any individual reading failed.
- `esp_send_*()`: returns `bool` — `true` if the Backend responded 2xx.

## 4. Doxygen Comment Style
Every public function in a `.h` file must have a Doxygen block comment immediately above it:
```cpp
/**
 * @brief Short description of what the function does.
 * @param param_name Description of the parameter (if any).
 * @return Description of the return value, including error cases.
 */
```

## 5. File/Module Convention
| File | Content |
|---|---|
| `esp_sensors.h/.cpp` | Direct sensor reads (Temperature, Humidity, Light) |
| `esp_network.h/.cpp` | WiFi + HTTP upload to the Backend, NTP time sync |
| `main.ino` | Entry point; read → send loop |

## 6. Logging Convention
```cpp
Serial.println("[esp_sensors] ...");
Serial.println("[esp_network] ...");
Serial.println("[main] ...");
```

## 7. Architecture Note
This firmware follows the confirmed System Architecture (SP1-08): ESP8266 is a standalone Monitoring Node with **no UART link to STM32**. Do not re-add STM32-specific UART code without confirming the architecture has changed again.
