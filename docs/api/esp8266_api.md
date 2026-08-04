# ESP8266 API Document (SP1-11)

> Đối chiếu trực tiếp với **STM32 API Reference**: `BMP280_ReadTemperature()`, `BH1750_ReadLight()`, `MQ135_ReadAirQuality()`, `UART_SendToESP()`, `Relay_ControlDevice()`. ESP8266 nhận dữ liệu 3 cảm biến này qua UART và chuyển tiếp Control Command xuống STM32 để gọi `Relay_ControlDevice()`.

## 1. UART Module (`esp_uart.h`)

| Hàm | Tham số | Trả về | Mô tả |
|---|---|---|---|
| `void esp_uart_init()` | — | — | Khởi tạo UART giao tiếp với STM32. |
| `SensorData esp_read_all()` | — | `SensorData` | Đọc & parse frame từ `UART_SendToESP()` bên STM32. `valid=false` nếu timeout/lỗi. |
| `bool esp_send_command(const String&)` | `command` | `bool` | Gửi lệnh xuống STM32 để STM32 gọi `Relay_ControlDevice()`. |
| `String esp_air_quality_to_string(AirQualityLevel)` | `level` | `String` | Convert enum sang text để đưa vào JSON. |

### Struct `SensorData` (khớp đúng 3 cảm biến STM32 đang đọc — **không có humidity**)
```cpp
enum AirQualityLevel { AIR_NORMAL, AIR_WARNING, AIR_DANGER, AIR_UNKNOWN };

struct SensorData {
    float temperature;      // từ BMP280_ReadTemperature()
    float light;              // Lux, từ BH1750_ReadLight()
    AirQualityLevel airQuality; // từ MQ135_ReadAirQuality() — Normal/Warning/Danger (không phải ppm)
    bool  valid;
    unsigned long timestamp_ms;
};
```

### Frame format (STM32 → ESP8266, qua `UART_SendToESP(payload)`)
Giả định tạm: `T:27.5,L:350.0,AQ:NORMAL\n`
> ⚠️ STM32 API Reference chỉ ghi tham số `payload` là "data string", **chưa nêu format cụ thể**. Cần hỏi bạn làm STM32 xác nhận đúng format thật (text CSV như trên, hay JSON, hay binary) trước khi build — nếu khác, sửa `parseFrame()` trong `esp_uart.cpp`.

## 2. Network Module (`esp_network.h`)

| Hàm | Trả về | Mô tả |
|---|---|---|
| `esp_network_init()` | — | Kết nối WiFi. |
| `esp_wifi_connected()` | `bool` | Trạng thái WiFi. |
| `esp_build_payload(data)` | `String` (JSON) | Đóng gói `SensorData` → JSON gửi Backend. |
| `esp_send_temperature(value)` | `bool` | Gửi riêng lẻ nhiệt độ. |
| `esp_send_light(value)` | `bool` | Gửi riêng lẻ ánh sáng. |
| `esp_send_air_quality(level)` | `bool` | Gửi riêng lẻ trạng thái chất lượng không khí. |
| `esp_send_data(data)` | `bool` | **Khuyến nghị** — gửi cả 3 trong 1 request. |
| `esp_network_poll_command()` | `String` | Hỏi Backend lệnh mới (để chuyển tiếp cho `Relay_ControlDevice()`). |

## 3. JSON Payload — Sensor Data (`POST /sensor`)
```json
{
  "device_id": "esp01",
  "timestamp": 123456789,
  "temperature": 27.5,
  "light": 350.0,
  "air_quality": "NORMAL"
}
```

## 4. JSON Response — Control Command (`GET /command`)
```json
{ "command": "FAN:ON" }
```
Thiết bị điều khiển được (khớp `Relay_ControlDevice()` bên STM32 — Ventilation fan, lighting, exhaust fan, warning buzzer):

| DEVICE | Ý nghĩa |
|---|---|
| `FAN` | Ventilation fan |
| `LIGHT` | Lighting |
| `EXHAUST_FAN` | Exhaust fan |
| `BUZZER` | Warning buzzer |

STATE: `ON` / `OFF`. Ví dụ: `"FAN:ON"`, `"BUZZER:OFF"`.
> Cần thống nhất chính xác keyword DEVICE với STM32 (STM32 dùng PascalCase nội bộ, nhưng chuỗi lệnh qua UART là tự do — nên chốt cùng nhau).

## 5. Lưu ý về `Alert_LocalTrigger()`
Hàm này bên STM32 kích hoạt cảnh báo cục bộ (LED + Buzzer) **độc lập** với Relay, có thể tự động khi `MQ135_ReadAirQuality()` trả `DANGER` — không cần ESP8266 gửi lệnh riêng cho việc này, chỉ cần ESP8266 gửi đúng `air_quality` lên Backend để hiển thị/log.
