# ESP8266 Coding Convention

## 1. Quy tắc đặt tên hàm

| Nhóm | Tiền tố | Ví dụ |
|---|---|---|
| Nhận dữ liệu từ STM32 (UART) | `esp_read_*` | `esp_read_all()` |
| Gửi lệnh xuống STM32 (UART) | `esp_send_command` | `esp_send_command("FAN:ON")` |
| Gửi dữ liệu lên Backend (WiFi) | `esp_send_*` | `esp_send_temperature()`, `esp_send_light()`, `esp_send_air_quality()`, `esp_send_data()` |
| Đóng gói dữ liệu | `esp_build_*` | `esp_build_payload()` |
| Hỏi Backend có lệnh mới | `esp_network_poll_*` | `esp_network_poll_command()` |
| Khởi tạo module | `esp_<module>_init` | `esp_uart_init()`, `esp_network_init()` |

> Lưu ý: ESP8266 dùng convention `snake_case` + tiền tố `esp_`, khác với STM32 dùng `PascalCase` + tiền tố module (`BMP280_ReadTemperature`) — đây là 2 codebase riêng, không cần đồng nhất style, chỉ cần khớp **giao thức UART** giữa 2 bên.

## 2. Bộ dữ liệu cảm biến (khớp đúng STM32 API Reference)
STM32 chỉ đọc 3 loại dữ liệu — **không có độ ẩm**:
| STM32 | ESP8266 nhận qua UART | Đơn vị |
|---|---|---|
| `BMP280_ReadTemperature()` | `SensorData.temperature` | °C |
| `BH1750_ReadLight()` | `SensorData.light` | Lux |
| `MQ135_ReadAirQuality()` | `SensorData.airQuality` (enum) | NORMAL / WARNING / DANGER |

## 3. Quy tắc kiểu trả về
- `esp_read_all()`: trả `SensorData`, `valid=false` nếu frame lỗi/timeout.
- `esp_send_*`, `esp_send_command`: trả `bool`.
- `esp_network_poll_command()`: trả `String` rỗng `""` nếu không có lệnh mới.

## 4. Doxygen Comment Style
```cpp
/**
 * @brief Mô tả ngắn gọn chức năng hàm.
 * @param ten_tham_so Mô tả tham số.
 * @return Mô tả giá trị trả về, gồm cả trường hợp lỗi.
 */
```

## 5. Quy tắc file/module
| File | Nội dung |
|---|---|
| `esp_uart.h/.cpp` | Nhận sensor data từ STM32 (UART_SendToESP), gửi command (Relay_ControlDevice) |
| `esp_network.h/.cpp` | WiFi + HTTP với Backend |
| `main.ino` | Điều phối 2 luồng: STM32→Backend và Backend→STM32 |

## 6. Format frame UART (cần chốt với STM32)
- Sensor data (STM32→ESP): `T:<temp>,L:<light>,AQ:<NORMAL|WARNING|DANGER>\n` *(tạm thời — chưa xác nhận chính thức)*
- Control command (ESP→STM32): `<DEVICE>:<STATE>` — DEVICE ∈ {FAN, LIGHT, EXHAUST_FAN, BUZZER}, STATE ∈ {ON, OFF}

## 7. Quy tắc log
```cpp
Serial.println("[esp_uart] ...");
Serial.println("[esp_network] ...");
Serial.println("[main] ...");
```
