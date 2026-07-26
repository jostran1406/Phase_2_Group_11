# Backend Architecture

## 1. Overview

## 2. Backend Architecture
```mermaid

graph LR

ESP8266 --> Backend

Backend --> REST_API

REST_API --> Controller

Controller --> Service

Service --> Database

```

## 3. MVC
```mermaid

graph TD

Routes

Routes --> Controller

Controller --> Service

Service --> Model

Model --> MySQL

```

## 4. Database Selection
Database
MySQL
Reason
- Open Source
- Stable
- Relational
- Suitable for IoT
- Easy Backup
- Good NodeJS Support

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

## 6. Data Storage Flow
```mermaid

flowchart LR

STM32

-->

ESP8266

-->

Backend

-->

Validation

-->

MySQL

-->

REST API

-->

Frontend

```

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

## 8. Component Relationship
```mermaid

graph LR

Sensor

-->

STM32

-->

ESP8266

-->

Backend

-->

Database

Backend

-->

Frontend

Frontend

-->

User

STM32

-->

Relay

Relay

-->

Fan

Relay

-->

Light

Relay

-->

Buzzer

```

## 9. Communication Protocol
```mermaid

graph LR

Sensor

-- GPIO/I2C -->

STM32

STM32

-- UART -->

ESP8266

ESP8266

-- MQTT -->

Backend

Backend

-- SQL -->

MySQL

Frontend

-- REST API -->

Backend

User

-- HTTPS -->

Frontend

```