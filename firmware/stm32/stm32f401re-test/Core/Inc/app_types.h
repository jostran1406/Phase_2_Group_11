#ifndef APP_TYPES_H_
#define APP_TYPES_H_

#include <stdint.h>

// Struct cũ lưu dữ liệu cảm biến
typedef struct {
    float temperature;
    float lightIntensity;
    uint16_t airQuality;
    uint8_t alertStatus;
} SensorData_t;

// Thêm Struct mới lưu các ngưỡng thiết lập
typedef struct {
    float temperature; // Ngưỡng bật quạt
    float light;       // Ngưỡng bật đèn
    uint16_t gas;      // Ngưỡng báo động khí gas
} Thresholds_t;

// Khai báo biến toàn cục (dùng extern để các file khác đều gọi được)
extern Thresholds_t sysThresholds;

#endif /* APP_TYPES_H_ */
