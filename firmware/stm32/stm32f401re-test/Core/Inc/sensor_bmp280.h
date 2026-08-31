#ifndef SENSOR_BMP280_H_
#define SENSOR_BMP280_H_

#include "main.h"       // Nhận diện các thư viện và cấu trúc HAL của STM32
#include "app_types.h"  // Nhận diện struct SensorData_t của hệ thống

/* Địa chỉ I2C của BMP280 (Gốc là 0x76, dịch trái 1 bit = 0xEC) */
#define BMP280_ADDRESS 0xEC

/* Các thanh ghi chức năng */
#define BMP280_REG_CTRL_MEAS 0xF4
#define BMP280_REG_TEMP_MSB  0xFA
#define BMP280_REG_CALIB     0x88

/* Struct lưu trữ các thông số bù trừ nhiệt độ (Compensation Parameters) */
typedef struct {
    uint16_t dig_T1;
    int16_t  dig_T2;
    int16_t  dig_T3;
} BMP280_CalibData_t;

/* Khai báo nguyên mẫu hàm API (Prototypes) */
void BMP280_Init(I2C_HandleTypeDef *hi2c);
float BMP280_ReadTemperature(I2C_HandleTypeDef *hi2c);

#endif /* SENSOR_BMP280_H_ */
