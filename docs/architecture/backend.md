# Backend Architecture

## 1. Overview

The Backend is responsible for receiving, processing, storing, and providing environmental monitoring data collected from IoT devices deployed in the laboratory.

Sensor data is acquired by the STM32 microcontroller from environmental sensors and transmitted to the ESP8266 gateway through UART communication. The ESP8266 then forwards the collected data to the backend server using MQTT/HTTP protocols.

After validating and processing the received data, the backend stores it in a MySQL database and provides REST APIs for the frontend dashboard to retrieve real-time and historical information.

In addition, the backend manages alert generation, device status monitoring, threshold configuration, and data access services to support automatic control and user interaction. The architecture is designed to be scalable, maintainable, and suitable for future expansion of additional sensors and monitoring nodes.

---

## 2. Backend Architecture

```mermaid
graph LR

ESP8266 --> Backend

Backend --> REST_API

REST_API --> Controller

Controller --> Service

Service --> Database
```

---

## 3. MVC

```mermaid
graph TD

Routes --> Controller

Controller --> Service

Service --> Model

Model --> MySQL
```

---

## 4. Database Selection

### Database

MySQL

### Reasons

- Open Source
- Stable
- Relational Database
- Suitable for IoT Applications
- Easy Backup and Recovery
- Good NodeJS Integration

---

## 5. Database Schema

```mermaid
erDiagram

USER {
INT id
VARCHAR username
VARCHAR password
}

SENSOR_DATA {
INT id
FLOAT temperature
FLOAT humidity
FLOAT light
DATETIME timestamp
}

DEVICE {
INT id
VARCHAR name
BOOLEAN status
}

ALERT {
INT id
VARCHAR type
VARCHAR message
DATETIME time
}

SETTING {
INT id
FLOAT temperature_threshold
FLOAT humidity_threshold
FLOAT light_threshold
}
```

---

## 5.1 Database Relationships

```mermaid
erDiagram

USER ||--o{ ALERT : receives

SETTING ||--o{ ALERT : triggers

DEVICE ||--o{ ALERT : generates

DEVICE ||--o{ SENSOR_DATA : produces
```

### Relationship Description

- Each Device generates multiple Sensor Data records.
- Devices may generate alert events when monitored values exceed configured thresholds.
- System Settings define threshold values used to trigger alerts.
- Users receive and monitor alert notifications through the dashboard.

---

## 6. Data Storage Flow

```mermaid
flowchart LR

Sensors --> STM32

STM32 --> ESP8266

ESP8266 --> Backend

Backend --> Validation

Validation --> MySQL

MySQL --> REST_API

REST_API --> Frontend
```

---

## 6.1 Data Storage Strategy

Sensor data collected from environmental sensors is processed by STM32 and transmitted to ESP8266 through UART communication. The ESP8266 forwards the sensor data to the backend server using MQTT/HTTP protocols.

The backend validates incoming data before storing it in the MySQL database.

Environmental data including temperature, humidity, and light intensity is recorded periodically to support real-time monitoring and historical analysis.

Alert events are stored separately to maintain a complete event history and support notification services. Device status changes are also logged to assist system monitoring and troubleshooting.

The storage design ensures data consistency, scalability, and efficient retrieval for dashboard visualization and reporting.

---

## 7. REST API Flow

```mermaid
sequenceDiagram

User->>Frontend: Login

Frontend->>Backend: HTTP Request

Backend->>Database: SQL Query

Database-->>Backend: Result

Backend-->>Frontend: JSON

Frontend-->>User: Display
```

---

## 7.1 Dashboard Data Flow

```mermaid
flowchart LR

Dashboard --> Dashboard_API

Dashboard_API --> Backend

Backend --> MySQL

MySQL --> Backend

Backend --> Dashboard_API

Dashboard_API --> Dashboard
```

The dashboard retrieves summarized real-time information through a dedicated Dashboard API. The backend collects the latest sensor data, device status, and alert information from the database and returns a single aggregated response for dashboard visualization.

---

## 8. Component Relationship

```mermaid
graph LR

Sensor --> STM32

STM32 --> ESP8266

ESP8266 --> Backend

Backend --> Database

Backend --> Frontend

Frontend --> User

STM32 --> Relay

Relay --> Fan

Relay --> Light

Relay --> Buzzer
```

---

## 9. Communication Protocol

```mermaid
graph LR

Sensor -- GPIO/I2C --> STM32

STM32 -- UART --> ESP8266

ESP8266 -- HTTP --> Backend

Backend -- SQL --> MySQL

Frontend -- REST API --> Backend

User -- HTTPS --> Frontend

STM32 -- GPIO --> Relay
```

---

## 10. API Design

### Authentication API

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/login | User login |

### Sensor API

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/sensors/latest | Get latest sensor data |
| GET | /api/sensors/history | Get sensor history |

### Device API

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/device/control | Control devices |

### Alert API

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/alerts | Get alert history |
```

## 11. JSON Data Format

### Sensor Data Payload

```json
{
  "node_id": 1,
  "temperature": 28.5,
  "humidity": 65.2,
  "light": 420,
  "timestamp": "2026-08-09T08:30:00Z"
}
```

### Device Control Payload

```json
{
  "device": "fan",
  "status": true
}
```

### Login Request

```json
{
  "username": "admin",
  "password": "123456"
}
```