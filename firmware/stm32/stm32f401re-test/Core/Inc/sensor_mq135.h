#ifndef SENSOR_MQ135_H_
#define SENSOR_MQ135_H_

#include "main.h"
#include "app_types.h"

/* Hàm tự động hiệu chuẩn trong không khí sạch */
void MQ135_Calibrate(ADC_HandleTypeDef *hadc);

/* Hàm đọc nồng độ khí gas */
uint16_t MQ135_ReadAirQuality(ADC_HandleTypeDef *hadc, uint16_t *raw_adc_out);

#endif /* SENSOR_MQ135_H_ */
