# Frontend Architecture

## 1. Overview
The Frontend is a web-based monitoring dashboard developed for the IoT Laboratory Monitoring System. The dashboard provides real-time visualization of temperature, humidity and light intensity data collected by ESP8266-based monitoring nodes deployed throughout the laboratory.

The dashboard provides real-time visualization of temperature, humidity, and light intensity measurements, as well as device status information and alert notifications. Users can also review historical data, monitor system health, and configure operational thresholds for automatic control functions.

By interacting with the backend through REST APIs, the frontend delivers a centralized and user-friendly platform for laboratory environment monitoring and management. The design supports future enhancements, including additional monitoring nodes, advanced analytics, and mobile accessibility.

## 2. Frontend Architecture
```mermaid
graph LR

User --> Dashboard

Dashboard --> Components

Components --> API_Service

API_Service --> Backend

```

## 3. Components
```mermaid
graph TD

Dashboard

Dashboard --> Navbar

Dashboard --> Sidebar

Dashboard --> SensorCards

Dashboard --> Chart

Dashboard --> DeviceControl

Dashboard --> AlertHistory

Dashboard --> Footer

```

## 4. Window and Page Design
| Window | Description |
|---------|-------------|
| Login | User authentication |
| Dashboard | Monitoring sensor data |
| Device | Manual control |
| History | Alert history |
| Setting | Threshold configuration |

## 5. Navigation Flow
```mermaid
flowchart LR

Login --> Dashboard

Dashboard --> Device

Dashboard --> History

Dashboard --> Setting

Device --> Dashboard

History --> Dashboard

Setting --> Dashboard

```

## 6. Dashboard Wireframe
```mermaid
flowchart TB

Navbar[Navigation Bar]

Sidebar[Sidebar Menu]

Dashboard[Dashboard Page]

Temp[Temperature Card]

Hum[Humidity Card]

Light[Light Intensity Card]

Chart[Real-time Chart]

Control[Device Control Panel]

Alert[Alert Notification Panel]

Navbar --> Dashboard

Sidebar --> Dashboard

Dashboard --> Temp

Dashboard --> Hum

Dashboard --> Light

Dashboard --> Chart

Dashboard --> Control

Dashboard --> Alert
```
### Wireframe Description

The dashboard provides a centralized interface for monitoring laboratory conditions. Sensor cards display real-time environmental data, while charts visualize historical trends. Users can control connected devices and view system alerts from a single dashboard page.

## 7. Sensor Data Visualization
```mermaid
flowchart TB

A[Navbar]

B[Sidebar]

C[Temperature Card]

D[Humidity Card]

E[Light Card]

F[Chart]

G[Device Control]

H[Alert History]

A --> B

B --> C

C --> D

D --> E

E --> F

F --> G

G --> H

```
