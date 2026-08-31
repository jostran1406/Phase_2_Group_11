#ifndef COMM_ESP8266_RX_H_
#define COMM_ESP8266_RX_H_

#include "main.h"
#include "app_types.h"
#include "actuator_relay.h"
#include <stdio.h>
#include <string.h>

#define FRAME_HEADER 0xAA
#define FRAME_TAIL   0x55

/* Định nghĩa các trạng thái của Máy trạng thái nhận UART */
typedef enum {
    STATE_HEADER,
    STATE_LENGTH,
    STATE_PAYLOAD,
    STATE_CHECKSUM,
    STATE_TAIL
} UART_RxState_t;

/* Khai báo biến ngoại lai lấy từ main.c */
extern volatile uint8_t systemMode;
extern volatile uint8_t sync_request; // Cờ báo để gửi Sync State an toàn

/* Khai báo nguyên mẫu hàm Nhận (RX) */
void UART_StartReceive(UART_HandleTypeDef *huart);

#endif /* COMM_ESP8266_RX_H_ */
