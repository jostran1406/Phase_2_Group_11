# STM32 Architecture
![STM32 Architecture Diagram](stm32-architecture.png)
## 1. Overview

## 2. STM32 Responsibilities

## 3. Hardware Components
![STM32 Module Components](stm32-module.png)

The hardware architecture at each Node consists of the following components:

* **Central Microcontroller:** STM32F401RE.
* **Network Communication Module:** ESP8266 is responsible for the WiFi connection and transmitting data to the Server.
* **Local Alarm Mechanism:** LED and Buzzer.
* **Control Mechanism (via Relay):** Includes ventilation fans, lighting, and exhaust fans.

## 4. Software Architecture

## 5. Sensor Components

## 6. Sensor Data Processing

## 7. Communication Interface

## 8. Control Logic

## 9. STM32 Data Flow
![STM32 Data Flow](stm32-flow.png)

The data flow starts from the physical environmental signals, passes through the sensor's converters, enters the STM32's peripherals, and is then transmitted via UART to the ESP8266 to go out to the internet network. When there is a control signal, the data flow goes in the opposite direction, from the UART into the STM32, and out through the GPIO pins to open/close the Relays.

## 10. STM32 Operation Sequence