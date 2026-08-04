# ESP8266 Build Guide (SP1-11)

## 1. Cài đặt môi trường
1. Arduino IDE: https://www.arduino.cc/en/software
2. **File → Preferences** → Additional Board Manager URLs:
   ```
   http://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
3. **Tools → Board → Board Manager** → cài `esp8266`
4. Chọn board: **NodeMCU 1.0 (ESP-12E Module)**

### Thư viện cần cài
| Thư viện | Mục đích |
|---|---|
| `ArduinoJson` (6.x) | Build/parse JSON |
| `ESP8266WiFi`, `ESP8266HTTPClient` | Có sẵn trong ESP8266 board package |
| `SoftwareSerial` | Có sẵn trong Arduino core — UART với STM32 |

## 2. Cấu trúc project
```
esp8266_firmware/
├── main.ino
├── esp_uart.h
├── esp_uart.cpp
├── esp_network.h
└── esp_network.cpp
```

## 3. Đấu nối phần cứng
| Kết nối | ESP8266 (NodeMCU) | STM32F401RE |
|---|---|---|
| UART RX (nhận từ STM32) | D2 | TX (nơi gọi `UART_SendToESP`) |
| UART TX (gửi lệnh xuống STM32) | D1 | RX (nơi STM32 nhận lệnh cho `Relay_ControlDevice`) |
| GND chung | GND | GND |

> Baud rate mặc định `115200` — phải khớp với cấu hình UART bên STM32.

## 4. Cấu hình trước khi build
`esp_network.h`:
```cpp
#define WIFI_SSID       "ten_wifi_that"
#define WIFI_PASSWORD   "mat_khau_wifi"
#define BACKEND_URL     "http://<ip-backend>:<port>/sensor"
#define COMMAND_URL     "http://<ip-backend>:<port>/command"
#define DEVICE_ID       "esp01"
```
`esp_uart.h`: xác nhận `UART_BAUD_RATE` khớp STM32, và **format frame** khớp với `UART_SendToESP()` thật (xem ghi chú trong `esp8266_api.md`).

## 5. Build & Upload
1. Cắm ESP8266 qua USB, chọn **Tools → Port**
2. **Verify (✓)** để build thử
3. **Upload (→)** để flash
4. **Serial Monitor** baud `115200`, log mẫu:
   ```
   [esp_uart] UART initialized (STM32 link)
   [esp_network] Connected, IP: 192.168.x.x
   [esp_network] Send OK (HTTP 200)
   [main] New command from Backend: FAN:ON
   [esp_uart] Sent command to STM32: FAN:ON
   ```

## 6. Troubleshooting
| Lỗi | Nguyên nhân |
|---|---|
| `esp_read_all()` luôn `valid=false` | Sai chân RX/TX, sai baud, hoặc format frame STM32 gửi khác giả định `T:..,L:..,AQ:..` |
| `air_quality` luôn `UNKNOWN` | STM32 gửi giá trị khác `NORMAL/WARNING/DANGER` (viết hoa/thường khác) — cần khớp chính xác chuỗi |
| WiFi connect mãi không xong | Sai SSID/password, hoặc ngoài băng tần 2.4GHz |
| HTTP gửi luôn FAILED | Sai `BACKEND_URL`, backend chưa chạy, không cùng mạng |
| Command không tới STM32 | Kiểm tra `COMMAND_URL` trả đúng JSON, và bên STM32 đang lắng nghe đúng baud/format lệnh cho `Relay_ControlDevice()` |

## 7. (Tùy chọn) PlatformIO
```ini
[env:nodemcuv2]
platform = espressif8266
board = nodemcuv2
framework = arduino
lib_deps =
    bblanchon/ArduinoJson
```
