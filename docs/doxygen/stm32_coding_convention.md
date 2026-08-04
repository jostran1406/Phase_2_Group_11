# STM32 Coding Convention & Doxygen Guidelines

This document specifies the coding conventions and how to use Doxygen to automatically generate documentation for the C source code on the STM32F401RE microcontroller.

## 1. Naming Convention

*   **Variables:** Use `camelCase` (e.g., `temperatureValue`).
*   **Functions:** Use `PascalCase` with a module prefix (e.g., `BMP280_ReadTemp`).
*   **Constants & Macros:** Use `UPPER_SNAKE_CASE` (e.g., `UART_TIMEOUT`).
*   **Custom Data Types (Struct/Enum):** Use the `_t` suffix (e.g., `SensorData_t`).

## 2. Doxygen Comment Structure

All public functions must have a Doxygen-standard block comment immediately preceding the function definition.
All public functions must have a Doxygen-standard block comment immediately preceding the function definition.

**Standard Block Example:**

```c
/**
 * @brief  Reads the temperature value from the BMP280 sensor.
 * @param  hi2c Pointer to the I2C control structure.
 * @return The measured temperature value (float).
 */
float BMP280_ReadTemperature(I2C_HandleTypeDef *hi2c) {
    // Code logic
}
```