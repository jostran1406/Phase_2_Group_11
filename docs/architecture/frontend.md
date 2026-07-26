# Frontend Architecture

## 1. Overview
The Frontend Dashboard provides a web-based interface for monitoring environmental data collected from the IoT laboratory.
Users can monitor sensor values, control devices, receive alerts and configure threshold settings.

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

## 6. Sensor Data Visualization
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
