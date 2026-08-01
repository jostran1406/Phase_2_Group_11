# System Architecture

## 1. Overview

The IoT Laboratory Monitoring and Control System is designed to provide real-time environmental monitoring and remote device control for laboratory environments. The system integrates embedded hardware, wireless communication, backend services, database storage, and a web-based dashboard into a unified architecture.

The architecture follows a layered design to improve modularity, maintainability, and scalability. Environmental monitoring and device control are separated into independent modules. The ESP8266 acts as the Monitoring Node responsible for collecting sensor data, while the STM32 serves as the Control Node responsible for operating laboratory equipment.

---

## 2. Architecture Layers

The system consists of four logical layers:

- User Layer
- Application Layer
- Communication Layer
- Embedded Layer

Each layer performs a specific function while remaining loosely coupled with the others.

---

## 3. Overall System Architecture

The following diagram illustrates the overall architecture of the IoT Laboratory Monitoring System.

![Overall System Architecture](system-architecture.png)

### Layer Description

#### User Layer

Provides the interface for users to monitor environmental conditions and remotely control laboratory devices through the web-based dashboard.

#### Application Layer

Processes sensor data, stores environmental information, provides REST APIs for the frontend, and generates control commands based on user requests or business logic.

Components include:

- Frontend Dashboard
- Backend Server
- MySQL Database

#### Communication Layer

Provides wireless communication between the monitoring node and the backend server.

Component:

- ESP8266 Monitoring Node

Communication protocols:

- MQTT
- HTTP
- WiFi

#### Embedded Layer

Responsible for environmental monitoring and physical device control.

Monitoring Components:

- Temperature Sensor
- Humidity Sensor
- Light Sensor
- ESP8266 Monitoring Node

Control Components:

- STM32 Control Node
- Relay Module
- Fan
- Light
- Buzzer

---

## 4. Communication Protocol

The communication diagram below illustrates the communication interfaces between system components.

![Communication Diagram](communication-diagram.png)

### Protocol Description

| Connection | Protocol | Purpose |
|------------|----------|---------|
| User ↔ Frontend | HTTPS | User interaction |
| Frontend ↔ Backend | REST API | Request and response |
| Backend ↔ Database | SQL | Data storage |
| ESP8266 ↔ Backend | MQTT / HTTP | Sensor data transmission |
| Backend ↔ STM32 | Control Command | Device control |
| STM32 ↔ Relay | GPIO | Device control |

---

## 5. Data Flow

The following diagram illustrates how sensor data and control commands flow through the system.

![Data Flow Diagram](data-flow.png)

### Sensor Data Flow

1. Environmental sensors (Temperature, Humidity, and Light) are connected directly to the ESP8266 Monitoring Node.
2. ESP8266 periodically acquires sensor values and constructs a sensor data payload.
3. ESP8266 publishes the collected sensor data to the Backend Server using MQTT or HTTP.
4. The Backend validates the received data before storing it in the MySQL Database.
5. The Frontend Dashboard retrieves the latest environmental information through REST APIs.
6. Users monitor laboratory conditions in real time via the web interface.

### Control Command Flow

1. The user submits a device control request from the Frontend Dashboard.
2. The Frontend forwards the request to the Backend Server through REST APIs.
3. The Backend processes the request and generates the corresponding control command.
4. The Backend sends the control command to the STM32 Control Node.
5. STM32 parses the received command and updates the GPIO outputs.
6. The Relay Module switches laboratory devices such as the Fan, Light, or Buzzer on or off.

---

## 6. System Operation Sequence

The following sequence diagram illustrates the interaction between system components during monitoring and control operations.

![Sequence Diagram](sequence-diagram.png)

### Main Operations

The primary software operations illustrated in the sequence diagram include:

- Sensor acquisition by ESP8266
- Sensor payload construction
- MQTT/HTTP data publishing
- Sensor data validation
- Database insertion
- REST API request handling
- Control command generation
- Command parsing in STM32
- Relay control
- Device status update

The monitoring process begins with the ESP8266 Monitoring Node periodically collecting environmental data from the connected sensors. The collected data is packaged and transmitted to the Backend Server through MQTT or HTTP. The Backend validates the incoming data, stores it in the MySQL database, and provides the latest information to the Frontend Dashboard through REST APIs.

When a user issues a control request from the Dashboard, the Backend processes the request and generates a control command. The STM32 Control Node receives the command, parses it, and controls the corresponding GPIO outputs. These GPIO signals drive the Relay Module, which activates or deactivates laboratory devices such as the Fan, Light, and Buzzer. Finally, the updated device status is returned to the Backend and displayed on the Dashboard.

---

## 7. Design Characteristics

The architecture provides the following advantages:

- Layered architecture for better modularity
- Loose coupling between monitoring and control modules
- Separation between monitoring nodes (ESP8266) and control nodes (STM32)
- Easy maintenance and scalability
- Standard communication protocols
- Support for real-time monitoring
- Remote control capability
- Easy integration of additional sensors and actuators

---

## 8. Summary

The proposed architecture establishes a complete IoT laboratory monitoring and control platform by separating environmental monitoring from device control. The ESP8266 Monitoring Node is responsible for collecting and transmitting environmental data, while the STM32 Control Node focuses exclusively on controlling laboratory equipment through relay modules. This separation improves modularity, simplifies maintenance, enhances scalability, and allows future system expansion without significantly affecting the overall architecture.