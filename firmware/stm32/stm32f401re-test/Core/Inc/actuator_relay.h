#ifndef ACTUATOR_RELAY_H_
#define ACTUATOR_RELAY_H_

#include "main.h"

/* Định nghĩa ID định danh cho các thiết bị trong phòng thí nghiệm */
#define DEVICE_FAN        1   // Quạt làm mát
#define DEVICE_LIGHT      2   // Đèn chiếu sáng
#define DEVICE_EXHAUST    3   // Quạt thông gió hút khí độc

/* Định nghĩa trạng thái */
#define DEVICE_ON  1
#define DEVICE_OFF 0

/* Khai báo nguyên mẫu hàm (Prototype) */
void Relay_ControlDevice(uint8_t device_id, uint8_t state);

#endif /* ACTUATOR_RELAY_H_ */
