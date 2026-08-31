#ifndef ACTUATOR_ALERT_H_
#define ACTUATOR_ALERT_H_

#include "main.h" // Chứa các định nghĩa chân LED_WARN_Pin và BUZZER_Pin

/* Định nghĩa các trạng thái cho dễ đọc (Macro) */
#define ALERT_ON  1
#define ALERT_OFF 0

/* Khai báo nguyên mẫu hàm (Prototype) */
void Alert_LocalTrigger(uint8_t state);

#endif /* ACTUATOR_ALERT_H_ */
