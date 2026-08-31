#ifndef SENSOR_BH1750_H_
#define SENSOR_BH1750_H_

#include "main.h"       // Nhận diện cấu trúc HAL
#include "app_types.h"  // Nhận diện struct dữ liệu chung

/* Địa chỉ I2C của BH1750 (Gốc là 0x23, dịch trái 1 bit = 0x46) */
#define BH1750_ADDRESS 0x46

/* Lệnh đo ở chế độ phân giải cao liên tục (Continuously H-Resolution Mode) */
#define BH1750_CMD_CONT_H_RES 0x10

/*
 * HỆ SỐ TRUYỀN SÁNG CỦA VỎ BẢO VỆ (OPTICAL WINDOW TRANSMISSION)
 * - 1.0f : Bo mạch để trần (100% ánh sáng đi vào).
 * - 0.85f: Ví dụ vỏ mica che mất 15% ánh sáng, chỉ cho 85% đi qua.
 * -> Cần căn chỉnh lại thông số này theo vật liệu thực tế làm vỏ hộp.
 */
#define OPTICAL_WINDOW_TRANSMISSION 1.0f

/* Khai báo nguyên mẫu hàm API (Prototypes) */
void BH1750_Init(I2C_HandleTypeDef *hi2c);
float BH1750_ReadLight(I2C_HandleTypeDef *hi2c);

#endif /* SENSOR_BH1750_H_ */
