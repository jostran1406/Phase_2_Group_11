#include "comm_esp8266_rx.h"

uint8_t rx_byte;
char rx_buffer[255];
uint8_t rx_index = 0;

UART_RxState_t rx_state = STATE_HEADER;
uint8_t rx_expected_len = 0;
uint8_t rx_calc_checksum = 0;
uint8_t rx_recv_checksum = 0;

void UART_StartReceive(UART_HandleTypeDef *huart) {
    HAL_UART_Receive_IT(huart, &rx_byte, 1);
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
    if (huart->Instance == USART1) {
        switch (rx_state) {
            case STATE_HEADER:
                if (rx_byte == FRAME_HEADER) {
                    rx_index = 0;
                    rx_calc_checksum = 0;
                    memset(rx_buffer, 0, sizeof(rx_buffer));
                    rx_state = STATE_LENGTH;
                }
                break;
            case STATE_LENGTH:
                rx_expected_len = rx_byte;
                rx_calc_checksum ^= rx_byte;
                if (rx_expected_len > 0 && rx_expected_len < 200) rx_state = STATE_PAYLOAD;
                else rx_state = STATE_HEADER;
                break;
            case STATE_PAYLOAD:
                rx_buffer[rx_index++] = rx_byte;
                rx_calc_checksum ^= rx_byte;
                if (rx_index >= rx_expected_len) rx_state = STATE_CHECKSUM;
                break;
            case STATE_CHECKSUM:
                rx_recv_checksum = rx_byte;
                rx_state = STATE_TAIL;
                break;
            case STATE_TAIL:
                            if (rx_byte == FRAME_TAIL) {
                                // Xác thực toàn vẹn (Hoặc if (1) nếu muốn test bypass)
                                if (rx_calc_checksum == rx_recv_checksum) {
                                    rx_buffer[rx_index] = '\0';

                                    // --- CÁC LỆNH TOÀN CỤC (GLOBAL) LÚC NÀO CŨNG NHẬN ---

                                    // 0. Lệnh chuyển chế độ
                                    if (strstr(rx_buffer, "MODE_AUTO")) systemMode = 1;
                                    else if (strstr(rx_buffer, "MODE_MANUAL")) systemMode = 0;

                                    // 2. Lệnh Cập nhật ngưỡng
                                    else if (strstr(rx_buffer, "SET_TEMP:")) sscanf(rx_buffer, "SET_TEMP:%f", &sysThresholds.temperature);
                                    else if (strstr(rx_buffer, "SET_GAS:")) {
                                        uint16_t newGas;
                                        sscanf(rx_buffer, "SET_GAS:%hu", &newGas);
                                        sysThresholds.gas = newGas;
                                    }
                                    else if (strstr(rx_buffer, "SET_LIGHT:")) sscanf(rx_buffer, "SET_LIGHT:%f", &sysThresholds.light);

                                    // 3. Lệnh Đồng bộ (Dựng cờ báo)
                                    else if (strstr(rx_buffer, "GET_SYNC")) {
                                        sync_request = 1;
                                    }

                                    // --- CÁC LỆNH ĐIỀU KHIỂN THỦ CÔNG (CHỈ NHẬN KHI MODE = 0) ---

                                    // 1. Lệnh Manual (ĐÃ CHUYỂN XUỐNG DƯỚI CÙNG)
                                    else if (systemMode == 0) {
                                        if (strstr(rx_buffer, "FAN_ON")) Relay_ControlDevice(DEVICE_FAN, DEVICE_ON);
                                        else if (strstr(rx_buffer, "FAN_OFF")) Relay_ControlDevice(DEVICE_FAN, DEVICE_OFF);
                                        else if (strstr(rx_buffer, "LIGHT_ON")) Relay_ControlDevice(DEVICE_LIGHT, DEVICE_ON);
                                        else if (strstr(rx_buffer, "LIGHT_OFF")) Relay_ControlDevice(DEVICE_LIGHT, DEVICE_OFF);
                                        else if (strstr(rx_buffer, "EXHAUST_ON")) Relay_ControlDevice(DEVICE_EXHAUST, DEVICE_ON);
                                        else if (strstr(rx_buffer, "EXHAUST_OFF")) Relay_ControlDevice(DEVICE_EXHAUST, DEVICE_OFF);
                                    }
                                }
                            }
                            rx_state = STATE_HEADER;
                            break;
        }
        HAL_UART_Receive_IT(huart, &rx_byte, 1);
    }
}

void HAL_UART_ErrorCallback(UART_HandleTypeDef *huart) {
    if (huart->Instance == USART1) {
        __HAL_UART_CLEAR_OREFLAG(huart);
        __HAL_UART_CLEAR_NEFLAG(huart);
        __HAL_UART_CLEAR_FEFLAG(huart);
        rx_index = 0;
        rx_state = STATE_HEADER;
        memset(rx_buffer, 0, sizeof(rx_buffer));
        HAL_UART_Receive_IT(huart, &rx_byte, 1);
    }
}
