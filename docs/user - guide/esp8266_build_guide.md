# ESP8266 Build & Flashing Guide

## 1. Development Environment

### Arduino IDE
1. Download: https://www.arduino.cc/en/software
2. **File → Preferences** → Additional Board Manager URLs:
   ```
   http://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
3. **Tools → Board → Board Manager** → install `esp8266` (ESP8266 Community)
4. Select board: **Tools → Board → ESP8266 Boards → NodeMCU 1.0 (ESP-12E Module)**

### Required Libraries (Tools → Manage Libraries)
| Library | Purpose |
|---|---|
| `DHT sensor library` (Adafruit) | Read temperature/humidity |
| `Adafruit Unified Sensor` | Dependency of the DHT library |
| `ArduinoJson` (v6.x) | Build JSON payloads |
| `ESP8266WiFi`, `ESP8266HTTPClient` | Included with the ESP8266 board package |

## 2. Project Structure
```
esp8266_firmware/
├── main.ino
├── esp_sensors.h
├── esp_sensors.cpp
├── esp_network.h
└── esp_network.cpp
```

## 3. Hardware Wiring
| Sensor | ESP8266 pin (NodeMCU) |
|---|---|
| DHT (Temperature + Humidity) | D4 |
| LDR (Light) | A0 |

> Change `PIN_DHT`, `PIN_LDR`, `DHT_TYPE` in `esp_sensors.h` if the actual wiring/sensor differs (e.g. swap the LDR for an I2C BH1750 for a proper Lux reading).

## 4. Configuration Before Building
Open `esp_network.h`:
```cpp
#define WIFI_SSID       "your_actual_wifi_ssid"
#define WIFI_PASSWORD   "your_actual_wifi_password"
#define BACKEND_URL     "http://<backend-ip>:<port>/api/sensor/upload"
#define DEVICE_ID       "NODE_01"
```
Open `esp_network.cpp` and check the NTP timezone if the project targets a location other than Vietnam (UTC+7):
```cpp
static const long GMT_OFFSET_SEC = 7 * 3600;
```

## 5. Build & Upload
1. Plug the ESP8266 in via USB, select **Tools → Port**
2. **Verify (✓)** to build
3. **Upload (→)** to flash
4. **Serial Monitor**, baud `115200`:
   ```
   [esp_sensors] Sensor interface initialized (GPIO/I2C)
   [esp_network] Connecting to WiFi.....
   [esp_network] Connected, IP: 192.168.x.x
   [esp_network] Syncing time with NTP....
   [esp_network] Time synced
   [esp_network] Send OK (HTTP 200)
   ```

## 6. Troubleshooting
| Issue | Likely cause |
|---|---|
| `esp_read_temperature()`/`humidity()` returns NAN repeatedly | Wrong wiring, or wrong `DHT_TYPE` (DHT11 vs DHT22) |
| WiFi never connects | Wrong SSID/password, or not on 2.4GHz |
| HTTP send always FAILED | Wrong `BACKEND_URL`, backend not running, or not on the same network |
| Timestamp sends raw `millis()` instead of date string | NTP not synced (check internet access to `pool.ntp.org`) |

## 7. (Optional) PlatformIO
```ini
[env:nodemcuv2]
platform = espressif8266
board = nodemcuv2
framework = arduino
lib_deps =
    adafruit/DHT sensor library
    adafruit/Adafruit Unified Sensor
    bblanchon/ArduinoJson
```
Run: `pio run -t upload`
