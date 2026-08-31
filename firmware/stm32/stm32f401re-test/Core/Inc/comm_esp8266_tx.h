#ifndef COMM_ESP8266_TX_H_
#define COMM_ESP8266_TX_H_

#include "main.h"
#include "app_types.h"
#include "actuator_relay.h"
#include <stdio.h>
#include <string.h>

/* Mã định danh khung truyền (Frame Protocol) */
#define FRAME_HEADER 0xAA
#define FRAME_TAIL   0x55

/* Khai báo biến ngoại lai để lấy dữ liệu từ main.c */
extern volatile uint8_t systemMode;

/* Khai báo nguyên mẫu hàm Truyền (TX) */
void UART_SendFrame(UART_HandleTypeDef *huart, const char *payload);
void UART_SendToESP(UART_HandleTypeDef *huart, SensorData_t *data);
void UART_SendSyncState(UART_HandleTypeDef *huart);
void UART_SendBootUpRequest(UART_HandleTypeDef *huart);
#endif /* COMM_ESP8266_TX_H_ */
