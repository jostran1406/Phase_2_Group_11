#include "sensor_bmp280.h"

// Biến toàn cục (nội bộ file) để lưu các hệ số hiệu chuẩn
BMP280_CalibData_t bmp280_calib;

/**
 * @brief  Khởi động BMP280, cấu hình chế độ đo và tải dữ liệu hiệu chuẩn
 * @param  hi2c Con trỏ tới cấu trúc điều khiển I2C (VD: &hi2c1)
 */
void BMP280_Init(I2C_HandleTypeDef *hi2c) {
    /* Thiết lập Byte cấu hình: 0x27 (Normal Mode, Oversampling x1) */
    uint8_t config_byte = 0x27;

    // 1. Ghi cấu hình vào cảm biến
    HAL_I2C_Mem_Write(hi2c, BMP280_ADDRESS, BMP280_REG_CTRL_MEAS, I2C_MEMADD_SIZE_8BIT, &config_byte, 1, HAL_MAX_DELAY);

    // 2. Đọc 6 byte dữ liệu hiệu chuẩn từ nhà máy (Calibration Data)
    uint8_t calib_data[6];
    if (HAL_I2C_Mem_Read(hi2c, BMP280_ADDRESS, BMP280_REG_CALIB, I2C_MEMADD_SIZE_8BIT, calib_data, 6, HAL_MAX_DELAY) == HAL_OK) {
        // Ghép byte theo chuẩn Little Endian của Bosch
        bmp280_calib.dig_T1 = (calib_data[1] << 8) | calib_data[0];
        bmp280_calib.dig_T2 = (calib_data[3] << 8) | calib_data[2];
        bmp280_calib.dig_T3 = (calib_data[5] << 8) | calib_data[4];
    }
}

/**
 * @brief  Đọc thanh ghi nhiệt độ, áp dụng công thức bù trừ từ Datasheet
 * @param  hi2c Con trỏ tới cấu trúc điều khiển I2C (VD: &hi2c1)
 * @return Giá trị nhiệt độ đo được (float) chính xác đến 0.01°C.
 */
float BMP280_ReadTemperature(I2C_HandleTypeDef *hi2c) {
    uint8_t raw_data[3];
    int32_t adc_T;
    float temperature = 0.0f;

    // Đọc 3 byte dữ liệu nhiệt độ thô
    if (HAL_I2C_Mem_Read(hi2c, BMP280_ADDRESS, BMP280_REG_TEMP_MSB, I2C_MEMADD_SIZE_8BIT, raw_data, 3, HAL_MAX_DELAY) == HAL_OK) {

        // Ghép 3 byte thô thành số nguyên 20-bit
        adc_T = (raw_data[0] << 12) | (raw_data[1] << 4) | (raw_data[2] >> 4);

        // ==========================================================
        // PHƯƠNG TRÌNH TOÁN HỌC BÙ TRỪ NHIỆT ĐỘ TỪ BOSCH DATASHEET
        // ==========================================================
        float var1, var2;
        var1 = (((float)adc_T) / 16384.0f - ((float)bmp280_calib.dig_T1) / 1024.0f) * ((float)bmp280_calib.dig_T2);

        var2 = ((((float)adc_T) / 131072.0f - ((float)bmp280_calib.dig_T1) / 8192.0f) *
                (((float)adc_T) / 131072.0f - ((float)bmp280_calib.dig_T1) / 8192.0f)) * ((float)bmp280_calib.dig_T3);

        temperature = (var1 + var2) / 5120.0f;
    }

    return temperature;
}
