# ESP8266 API Reference

Based on the confirmed **System Architecture (SP1-08)**: ESP8266 is a **Monitoring Node** that reads Temperature, Humidity, and Light directly from the Environmental Sensors layer (I2C/GPIO), then uploads them to the Backend Server via MQTT/HTTP. There is **no UART link to STM32** in this architecture — the Backend sends Control Commands directly to the STM32 Control Node, which is entirely independent of ESP8266.

```
Environmental Sensors --I2C/GPIO--> ESP8266 Monitoring Node --MQTT/HTTP--> Backend Server
Backend Server --Control Command--> STM32 Control Node --GPIO--> Relay Module --> Buzzer/Light/Fan
```

## 1. Sensor Module (`esp_sensors.h`)

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `void esp_sensors_init()` | — | — | Initializes GPIO/I2C for the DHT (temperature/humidity) and LDR (light) sensors. |
| `float esp_read_temperature()` | — | `float` (°C), `NAN` on failure | Reads temperature from the DHT sensor. |
| `float esp_read_humidity()` | — | `float` (%), `NAN` on failure | Reads humidity from the DHT sensor. |
| `float esp_read_light()` | — | `float` (0-1023 raw ADC), `-1` on failure | Reads the LDR light sensor. |
| `SensorData esp_read_all()` | — | `SensorData` | Reads all 3 sensors, validates, and packages the result. |

### `SensorData` struct
```cpp
struct SensorData {
    float temperature;
    float humidity;
    float light;
    bool  valid;
    unsigned long timestamp_ms;
};
```

## 2. Network Module (`esp_network.h`)

| Function | Returns | Description |
|---|---|---|
| `esp_network_init()` | — | Connects to WiFi. |
| `esp_wifi_connected()` | `bool` | WiFi connection status. |
| `esp_time_init()` | — | Syncs time via NTP so timestamps match the Backend's `"YYYY-MM-DD HH:mm:ss"` format. |
| `esp_get_formatted_timestamp()` | `String` | Current time as `"YYYY-MM-DD HH:mm:ss"`, `""` if not yet synced. |
| `esp_build_payload(data)` | `String` (JSON) | Builds the JSON body for `POST /api/sensor/upload`. |
| `esp_send_temperature(value)` | `bool` | Sends temperature alone. |
| `esp_send_humidity(value)` | `bool` | Sends humidity alone. |
| `esp_send_light(value)` | `bool` | Sends light alone. |
| `esp_send_data(data)` | `bool` | **Recommended** — sends all 3 values in a single request. |

> This module has **no command-polling function** — see the architecture note above.

## 3. `POST /api/sensor/upload` — Request Body
Matches the Backend API doc exactly, no extra/missing fields:
```json
{
  "device_id": "NODE_01",
  "temperature": 28.5,
  "humidity": 70.2,
  "light": 450,
  "timestamp": "2026-08-05 10:30:00"
}
```

## 4. Response
```json
{
  "status": "success",
  "message": "Data received"
}
```
HTTP 2xx → treated as success. Otherwise, `main.ino` retries up to `MAX_RETRY` times before dropping that cycle's reading.

## 5. Out of scope for ESP8266 (handled elsewhere)
- **Control Command / Relay control** (Fan, Light, Buzzer) — handled directly between Backend Server and STM32 Control Node, per the System Architecture diagram. ESP8266 does not participate in this path.
- If a future architecture revision routes control commands back through ESP8266, re-introduce a `esp_network_poll_command()`-style function (see project history / previous SP1-11 drafts) — but this is **not** part of the current confirmed architecture.
