#include "sensor_mq135.h"
#include <math.h>

#define RL_VALUE  10.0f
#define MQ135_A   110.47f
#define MQ135_B   -2.862f

// Khởi tạo R0 mặc định, giá trị này sẽ được ghi đè sau khi chạy hàm Calibrate
float current_R0 = 19.42f;

/* Hàm hiệu chuẩn cảm biến lúc khởi động */
void MQ135_Calibrate(ADC_HandleTypeDef *hadc) {
    uint32_t adc_sum = 0;
    uint8_t sample_count = 50;

    // Lấy 50 mẫu để tính trung bình, giảm nhiễu
    for (int i = 0; i < sample_count; i++) {
        HAL_ADC_Start(hadc);
        if (HAL_ADC_PollForConversion(hadc, 10) == HAL_OK) {
            adc_sum += HAL_ADC_GetValue(hadc);
        }
        HAL_ADC_Stop(hadc);
        HAL_Delay(10); // Dừng 10ms giữa mỗi lần lấy mẫu
    }

    uint32_t raw_value_avg = adc_sum / sample_count;

    if (raw_value_avg > 0) {
        // Tính điện áp
        float voltage = (float)raw_value_avg * 3.3f / 4095.0f;
        // Tính Rs thực tế
        float Rs = RL_VALUE * (3.3f - voltage) / voltage;
        // Tính R0 (Trong không khí sạch, tỷ lệ Rs/R0 xấp xỉ 3.6)
        current_R0 = Rs / 3.6f;
    }
}

uint16_t MQ135_ReadAirQuality(ADC_HandleTypeDef *hadc, uint16_t *raw_adc_out) {
    uint32_t raw_value = 0;

    HAL_ADC_Start(hadc);
    if (HAL_ADC_PollForConversion(hadc, 10) == HAL_OK) {
        raw_value = HAL_ADC_GetValue(hadc);
    }
    HAL_ADC_Stop(hadc);

    if (raw_adc_out != NULL) {
        *raw_adc_out = (uint16_t)raw_value;
    }

    if (raw_value == 0) return 0;

    float voltage = (float)raw_value * 3.3f / 4095.0f;
    float Rs = RL_VALUE * (3.3f - voltage) / voltage;

    // Sử dụng current_R0 đã được hiệu chuẩn thay vì R0_CLEAN
    float ratio = Rs / current_R0;
    float calc_ppm = MQ135_A * pow(ratio, MQ135_B);

    return (uint16_t)calc_ppm;
}
