#include "comm_esp8266_tx.h"

/**
 * @brief  Đóng gói chuỗi payload vào Frame công nghiệp và gửi đi
 */
void UART_SendFrame(UART_HandleTypeDef *huart, const char *payload) {
    uint8_t len = strlen(payload);
    uint8_t frame_buffer[255];
    uint8_t idx = 0;
    uint8_t checksum = 0;

    frame_buffer[idx++] = FRAME_HEADER;
    frame_buffer[idx++] = len;
    checksum ^= len;

    for (uint8_t i = 0; i < len; i++) {
        frame_buffer[idx++] = payload[i];
        checksum ^= payload[i];
    }

    frame_buffer[idx++] = checksum;
    frame_buffer[idx++] = FRAME_TAIL;

    uint8_t retries = 0;
    while (HAL_UART_Transmit(huart, frame_buffer, idx, 500) != HAL_OK) {
        retries++;
        if (retries >= 3) break;
        for(volatile int j=0; j<1000; j++); // Delay mềm chống treo MCU
    }
}

/**
 * @brief  Đóng gói dữ liệu cảm biến thành chuỗi JSON và gửi qua UART
 */
void UART_SendToESP(UART_HandleTypeDef *huart, SensorData_t *data) {
    char json_buffer[150];
    memset(json_buffer, 0, sizeof(json_buffer));

    snprintf(json_buffer, sizeof(json_buffer),
                 "{\"node_id\":\"NODE_01\",\"mode\":%d,\"temperature\":%d,\"gas_ppm\":%d,\"light\":%d}",
                 systemMode, (int)data->temperature, (int)data->airQuality, (int)data->lightIntensity);
    UART_SendFrame(huart, json_buffer);
}

/**
 * @brief  Đóng gói cấu hình ngưỡng và trạng thái Relay
 */
void UART_SendSyncState(UART_HandleTypeDef *huart) {
    char sync_buffer[200];
    memset(sync_buffer, 0, sizeof(sync_buffer));

    uint8_t fan_state = (HAL_GPIO_ReadPin(RELAY_1_GPIO_Port, RELAY_1_Pin) == GPIO_PIN_SET) ? 1 : 0;
    uint8_t light_state = (HAL_GPIO_ReadPin(RELAY_2_GPIO_Port, RELAY_2_Pin) == GPIO_PIN_SET) ? 1 : 0;
    uint8_t exhaust_state = (HAL_GPIO_ReadPin(RELAY_3_GPIO_Port, RELAY_3_Pin) == GPIO_PIN_SET) ? 1 : 0;

    // THAY ĐỔI: Bỏ %f thay bằng %d, ép kiểu (int) cho các ngưỡng float
    snprintf(sync_buffer, sizeof(sync_buffer),
             "{\"type\":\"sync\",\"mode\":%d,\"t_thresh\":%d,\"g_thresh\":%hu,\"l_thresh\":%d,\"fan\":%d,\"light\":%d,\"exhaust\":%d}",
             systemMode, (int)sysThresholds.temperature, sysThresholds.gas, (int)sysThresholds.light,
             fan_state, light_state, exhaust_state);

    UART_SendFrame(huart, sync_buffer);
}
/**
 * @brief  Gửi thông báo mạch vừa khởi động để xin lại cấu hình từ Server
 */
void UART_SendBootUpRequest(UART_HandleTypeDef *huart) {
    // Đóng gói chuỗi JSON báo hiệu khởi động
    char boot_buffer[100];
    memset(boot_buffer, 0, sizeof(boot_buffer));

    // Gửi type là boot_up để Server nhận diện
    snprintf(boot_buffer, sizeof(boot_buffer), "{\"type\":\"boot_up\",\"status\":\"request_config\"}");

    UART_SendFrame(huart, boot_buffer);
}
