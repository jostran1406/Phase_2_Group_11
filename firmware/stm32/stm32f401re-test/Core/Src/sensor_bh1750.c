#include "sensor_bh1750.h"

void BH1750_Init(I2C_HandleTypeDef *hi2c) {
    uint8_t cmd = BH1750_CMD_CONT_H_RES;

    // Gửi 1 byte lệnh tới địa chỉ của cảm biến để đánh thức và cấu hình
    HAL_I2C_Master_Transmit(hi2c, BH1750_ADDRESS, &cmd, 1, HAL_MAX_DELAY);
}

float BH1750_ReadLight(I2C_HandleTypeDef *hi2c) {
    uint8_t buffer[2];
    uint16_t raw_val;
    float lux = 0.0f;

    // Đọc 2 byte dữ liệu trả về từ BH1750
    if (HAL_I2C_Master_Receive(hi2c, BH1750_ADDRESS, buffer, 2, HAL_MAX_DELAY) == HAL_OK) {

        // Ghép 2 byte lại với nhau
        raw_val = (buffer[0] << 8) | buffer[1];

        // Công thức chuẩn từ Datasheet + Bù trừ suy hao quang học vỏ hộp
        lux = ((float)raw_val / 1.2f) / OPTICAL_WINDOW_TRANSMISSION;
    }

    return lux;
}
