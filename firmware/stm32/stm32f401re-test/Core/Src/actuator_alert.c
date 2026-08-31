#include "actuator_alert.h"

/**
 * @brief  Kích hoạt hoặc Tắt cảnh báo tại chỗ (Còi + Đèn)
 * @param  state: ALERT_ON (Bật) hoặc ALERT_OFF (Tắt)
 */
void Alert_LocalTrigger(uint8_t state) {
    if (state == ALERT_ON) {
        // Bật Đèn LED (Mức CAO)
        HAL_GPIO_WritePin(LED_WARN_GPIO_Port, LED_WARN_Pin, GPIO_PIN_SET);
        // Bật Còi Buzzer (Mức CAO)
        HAL_GPIO_WritePin(BUZZER_GPIO_Port, BUZZER_Pin, GPIO_PIN_SET);
    }
    else {
        // Tắt Đèn LED (Mức THẤP)
        HAL_GPIO_WritePin(LED_WARN_GPIO_Port, LED_WARN_Pin, GPIO_PIN_RESET);
        // Tắt Còi Buzzer (Mức THẤP)
        HAL_GPIO_WritePin(BUZZER_GPIO_Port, BUZZER_Pin, GPIO_PIN_RESET);
    }
}
