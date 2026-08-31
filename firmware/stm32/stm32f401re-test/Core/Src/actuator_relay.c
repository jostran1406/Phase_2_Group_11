#include "actuator_relay.h"

/**
 * @brief  Điều khiển đóng/cắt Relay dựa trên ID thiết bị
 * @param  device_id: DEVICE_FAN, DEVICE_LIGHT, DEVICE_EXHAUST
 * @param  state: DEVICE_ON (1) hoặc DEVICE_OFF (0)
 */
void Relay_ControlDevice(uint8_t device_id, uint8_t state) {

    /*
     * Xác định mức điện áp cần xuất ra.
     * Lưu ý quan trọng: Phần lớn module Relay 5V trên thị trường là loại Kích mức Thấp (Active LOW).
     * Nếu mạch thực tế của bạn cắm vào mà logic bị ngược (gọi ON thì nó tắt),
     * bạn chỉ cần đảo ngược logic dưới đây thành: (state == DEVICE_ON) ? GPIO_PIN_RESET : GPIO_PIN_SET;
     */
    GPIO_PinState pinState = (state == DEVICE_ON) ? GPIO_PIN_SET : GPIO_PIN_RESET;

    // Lựa chọn chân điều khiển dựa vào ID thiết bị
    switch (device_id) {
        case DEVICE_FAN:
            HAL_GPIO_WritePin(RELAY_1_GPIO_Port, RELAY_1_Pin, pinState);
            break;

        case DEVICE_LIGHT:
            HAL_GPIO_WritePin(RELAY_2_GPIO_Port, RELAY_2_Pin, pinState);
            break;

        case DEVICE_EXHAUST:
            HAL_GPIO_WritePin(RELAY_3_GPIO_Port, RELAY_3_Pin, pinState);
            break;

        default:
            // Nếu truyền vào ID không hợp lệ thì không làm gì cả
            break;
    }
}
