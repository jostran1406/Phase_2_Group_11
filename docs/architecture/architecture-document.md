# Architecture Document

## 1. Introduction

### 1.1 Purpose

This document presents the overall software architecture of the IoT Laboratory Monitoring and Control System. It provides a comprehensive description of the system structure, major software components, communication mechanisms, and interactions between embedded devices and cloud services.

The purpose of this document is to establish a unified understanding of the system architecture for developers, project members, supervisors, and future maintainers. It also serves as the primary technical reference during implementation, integration, testing, deployment, and future system enhancement.

---

### 1.2 Scope

This architecture document covers the complete software architecture of the IoT Laboratory Monitoring and Control System, including both monitoring and control subsystems.

The document describes the following architectural components:

- Frontend Dashboard
- Backend Server
- MySQL Database
- ESP8266 Monitoring Node
- STM32 Control Node

Additionally, the document explains the communication protocols, data flow, deployment architecture, and interaction sequence between these components.

Hardware circuit implementation and detailed firmware algorithms are beyond the scope of this document and are described in their respective architecture documents.

---

### 1.3 Intended Audience

This document is intended for:

- Software developers
- Embedded system developers
- Project supervisors
- System testers
- Future maintenance engineers

The document enables readers to understand how different components cooperate to provide real-time environmental monitoring and remote laboratory device control.

---

### 1.4 Document Organization

The remainder of this document is organized as follows:

- Chapter 2 introduces the overall system overview.
- Chapter 3 presents the complete system architecture.
- Chapters 4 to 7 describe the architecture of each major subsystem.
- Chapters 8 to 10 explain system communication, data flow, and operational sequence.
- Chapter 11 presents the deployment architecture.
- The final chapters summarize the architectural characteristics and conclude the document.
# 2. Overall System Overview

## 2.1 System Overview

The IoT Laboratory Monitoring and Control System is designed to provide real-time environmental monitoring and intelligent device control for laboratory environments. The system continuously acquires environmental parameters, including temperature, humidity, and light intensity, and transmits the collected data to a centralized backend server through wireless communication.

Unlike traditional embedded systems where a single microcontroller performs both sensing and control tasks, the proposed architecture adopts a distributed design that separates monitoring and control responsibilities into dedicated processing nodes. This approach improves system modularity, simplifies maintenance, and enables independent scalability of sensing and control functionalities.

The complete system consists of four major software subsystems:

- Frontend Dashboard
- Backend Server
- ESP8266 Monitoring Node
- STM32 Control Node

Each subsystem performs an independent responsibility while collaborating through standardized communication interfaces.

---

## 2.2 Functional Overview

The system operation can be divided into two primary workflows:

### Environmental Monitoring

The ESP8266 Monitoring Node periodically collects environmental information from connected sensors, including temperature, humidity, and light intensity. After acquiring sensor readings, the node performs basic data validation, constructs a JSON payload, and transmits the information to the Backend Server using MQTT or HTTP over WiFi.

The Backend Server validates incoming data before storing it in the MySQL database. The Frontend Dashboard retrieves the latest information through RESTful APIs, allowing users to observe laboratory conditions in real time.

---

### Remote Device Control

Users can remotely control laboratory equipment through the Frontend Dashboard.

Control requests are transmitted to the Backend Server via REST APIs. After validating user requests and determining the appropriate control action, the Backend Server sends control commands to the STM32 Control Node.

The STM32 receives the command, parses the control message, and activates the corresponding GPIO outputs to control relay modules connected to laboratory devices such as ventilation fans, lighting systems, and alarm buzzers.

This separation between monitoring and control enables each subsystem to focus on a dedicated responsibility while minimizing unnecessary coupling between embedded devices.

---

## 2.3 System Components

The software architecture is composed of the following components.

| Component | Primary Responsibility |
|-----------|------------------------|
| Frontend Dashboard | Provides user interface for monitoring environmental conditions and controlling laboratory devices |
| Backend Server | Processes sensor data, manages business logic, stores data, exposes REST APIs, and coordinates communication between monitoring and control nodes |
| MySQL Database | Stores historical environmental data, device status, user information, and system logs |
| ESP8266 Monitoring Node | Collects environmental sensor data and publishes monitoring information to the Backend Server |
| STM32 Control Node | Receives control commands from the Backend Server and controls relays, warning lights, and alarm devices |

---

## 2.4 Architectural Design Principle

The architecture follows several software engineering principles to improve maintainability and scalability.

### Layered Architecture

The system is organized into independent architectural layers, allowing each layer to evolve without significantly affecting other components.

### Separation of Responsibilities

Monitoring and control functionalities are deployed on different embedded devices. The ESP8266 is dedicated to sensor acquisition and wireless communication, whereas the STM32 focuses exclusively on device control.

### Loose Coupling

Communication between software components is performed through standardized interfaces, including REST APIs, MQTT/HTTP, and GPIO abstraction, reducing direct dependencies between subsystems.

### Scalability

Additional monitoring nodes can be deployed without modifying the backend architecture. Similarly, additional control nodes may be integrated to support larger laboratory environments.

### Maintainability

Each subsystem can be developed, tested, and maintained independently, reducing software complexity and simplifying future system upgrades.
# 3. Overall System Architecture

## 3.1 Architectural Overview

The IoT Laboratory Monitoring and Control System adopts a layered and distributed architecture to achieve modularity, scalability, and maintainability. Instead of assigning all sensing, communication, and control functionalities to a single embedded device, the proposed architecture separates environmental monitoring from device control into independent processing nodes.

The complete architecture consists of four logical layers:

- User Layer
- Application Layer
- Communication Layer
- Embedded Layer

Each layer is responsible for a specific group of functionalities while communicating through standardized interfaces. This layered organization reduces coupling between software components and simplifies future system extension.

The overall system architecture is illustrated in Figure 3.1.

![Overall System Architecture](system-architecture.png)

**Figure 3.1. Overall System Architecture**
## 3.2 User Layer

The User Layer provides the interaction interface between users and the IoT monitoring platform.

Users access the system through a web browser to monitor laboratory environmental conditions, visualize historical sensor data, receive system notifications, and remotely control laboratory equipment.

The primary software component within this layer is the Frontend Dashboard.

Main responsibilities include:

- User authentication
- Real-time monitoring
- Historical data visualization
- Device control
- Alarm notification
## 3.3 Application Layer

The Application Layer represents the software core of the system. It is responsible for processing incoming sensor data, managing user requests, maintaining historical records, and coordinating communication between monitoring nodes and control nodes.

This layer consists of two major components:

- Backend Server
- MySQL Database

The Backend Server performs business logic processing, validates incoming data, manages RESTful APIs, communicates with embedded devices, and stores monitoring information inside the MySQL database.

The database provides persistent storage for:

- Environmental data
- Device status
- User information
- System logs
## 3.4 Communication Layer

The Communication Layer provides communication services between the application server and embedded devices.

Unlike the previous architecture where the ESP8266 functioned as a UART communication bridge, the updated architecture promotes the ESP8266 to an independent monitoring node capable of collecting sensor information and communicating directly with the Backend Server through WiFi.

The communication layer supports the following communication technologies:

- REST API
- MQTT
- HTTP
- WiFi

This design removes unnecessary intermediate communication and simplifies the monitoring subsystem.
## 3.5 Embedded Layer

The Embedded Layer contains all hardware devices responsible for environmental monitoring and laboratory device control.

Unlike the traditional embedded architecture where a single microcontroller handled both sensing and control tasks, the proposed architecture separates these responsibilities into two dedicated embedded nodes.

### ESP8266 Monitoring Node

The ESP8266 Monitoring Node is responsible for:

- Collecting environmental sensor data
- Performing basic data validation
- Constructing JSON payloads
- Publishing monitoring information to the Backend Server through MQTT or HTTP

### STM32 Control Node

The STM32 Control Node is responsible for:

- Receiving control commands from the Backend Server
- Parsing control messages
- Operating relay modules
- Activating warning devices
- Controlling laboratory equipment
## 3.6 Architectural Advantages

The proposed architecture provides several advantages compared to the previous design.

### Separation of Responsibilities

Monitoring and control functionalities are completely separated into dedicated processing nodes, reducing software complexity.

### Improved Scalability

Additional ESP8266 monitoring nodes can be deployed without modifying the control subsystem.

### Better Maintainability

Each subsystem can be developed, tested, and maintained independently.

### Lower Communication Complexity

Direct communication between the ESP8266 and Backend Server removes the dependency on UART communication between embedded devices.

### Higher Reliability

Failures occurring in the monitoring subsystem do not directly affect the operation of the control subsystem, improving overall system robustness.
# 4. Frontend Architecture

## 4.1 Overview

The Frontend Dashboard serves as the primary Human–Machine Interface (HMI) of the IoT Laboratory Monitoring and Control System. It enables users to monitor environmental conditions, visualize historical sensor data, receive system notifications, and remotely control laboratory equipment through an intuitive web-based interface.

The frontend communicates exclusively with the Backend Server through RESTful APIs. It does not communicate directly with embedded devices, ensuring a clear separation between presentation logic and system control.

The overall frontend architecture is illustrated in Figure 4.1.

![Frontend Architecture](frontend-architecture.png)

**Figure 4.1. Frontend Architecture**
## 4.2 Responsibilities

The Frontend Dashboard provides the following functionalities:

- User authentication and access management.
- Display of real-time environmental monitoring data.
- Visualization of historical sensor information through charts.
- Remote control of laboratory equipment.
- Display of warning notifications and system alerts.
- Communication with the Backend Server through REST APIs.

These responsibilities allow users to interact with the monitoring platform without requiring direct access to embedded hardware.
## 4.3 Software Components

The frontend software is organized into several logical modules.

### Authentication Module

Responsible for user login and session management.

### Dashboard Module

Displays real-time environmental information received from the Backend Server.

### Monitoring Module

Visualizes sensor measurements including:

- Temperature
- Humidity
- Light intensity

Historical data can also be displayed using charts and statistical summaries.

### Device Control Module

Allows users to remotely control laboratory devices, including lighting systems, ventilation fans, and warning devices.

### API Service Module

Provides communication between the frontend application and the Backend Server using REST APIs.
## 4.4 Communication

The Frontend Dashboard exchanges information only with the Backend Server.

Communication is performed using HTTPS requests following RESTful API principles.

Typical operations include:

- Requesting the latest environmental data.
- Retrieving historical monitoring records.
- Sending control commands.
- Receiving device status updates.
## 4.5 Architectural Advantages

The frontend architecture provides several advantages:

- Clear separation between user interface and business logic.
- Simple interaction through RESTful APIs.
- Easy integration with additional visualization modules.
- Responsive monitoring interface.
- Improved maintainability through modular software components.
# 5. Backend Architecture

## 5.1 Overview

The Backend Server acts as the central processing unit of the IoT Laboratory Monitoring and Control System. It is responsible for coordinating communication between monitoring nodes, control nodes, the database, and the frontend dashboard.

Unlike traditional client-server applications, the backend not only processes user requests but also continuously receives environmental data from distributed ESP8266 Monitoring Nodes and issues control commands to STM32 Control Nodes.

As the core of the entire system, the backend ensures reliable data processing, centralized management, and real-time communication between all software components.

The backend architecture is illustrated in Figure 5.1.

![Backend Architecture](backend-architecture.png)

**Figure 5.1. Backend Architecture**
## 5.2 Responsibilities

The Backend Server performs the following primary responsibilities:

- Receive environmental monitoring data from ESP8266 Monitoring Nodes.
- Validate incoming sensor data before processing.
- Store monitoring information in the MySQL database.
- Provide RESTful APIs for frontend applications.
- Process user control requests.
- Generate control commands for STM32 Control Nodes.
- Maintain device status information.
- Record historical monitoring data and system logs.

By centralizing these responsibilities, the backend provides a single point of management for the entire IoT platform.
## 5.3 Internal Components

The backend software consists of several logical modules that cooperate to process monitoring data and control requests.

### REST API Layer

Provides standardized RESTful interfaces for communication with the Frontend Dashboard.

Typical operations include:

- User authentication
- Environmental data retrieval
- Historical data queries
- Device control requests

---

### Business Logic Layer

Implements the core system logic, including:

- Data validation
- Device management
- Alarm generation
- Command generation
- Status management

This layer coordinates all communication between monitoring nodes, control nodes, and the database.

---

### Database Access Layer

Responsible for database communication.

Functions include:

- Insert sensor records
- Update device status
- Retrieve historical data
- Manage user information
- Store system logs

---

### Communication Manager

Handles communication with distributed embedded devices.

Monitoring Nodes communicate with the backend through MQTT or HTTP.

Control commands generated by the backend are delivered to STM32 Control Nodes through the communication service.
## 5.4 Database Interaction

The Backend Server uses a MySQL database to maintain persistent system information.

The database stores:

- Environmental monitoring records
- Device information
- User accounts
- Device status
- System logs

Each monitoring record contains sensor measurements together with timestamps to support historical visualization and trend analysis.

The backend performs Create, Read, Update, and Delete (CRUD) operations through the database access layer.
## 5.5 Communication Mechanism

The backend communicates with different system components using dedicated communication protocols.

| Component | Protocol | Purpose |
|-----------|----------|---------|
| Frontend Dashboard | REST API / HTTPS | User interaction |
| ESP8266 Monitoring Node | MQTT / HTTP | Sensor data transmission |
| STM32 Control Node | Control Service | Device control |
| MySQL Database | SQL | Data storage |

This communication mechanism enables loose coupling between software modules while maintaining reliable data exchange.
## 5.6 Data Processing Workflow

The Backend Server processes monitoring data through the following workflow:

1. Receive sensor data from ESP8266 Monitoring Nodes.
2. Validate incoming data.
3. Convert data into internal data models.
4. Store validated records in the MySQL database.
5. Notify frontend clients of updated information.
6. Evaluate control conditions when required.
7. Generate control commands for STM32 Control Nodes.
8. Update device status after successful execution.

This workflow ensures reliable processing while maintaining data consistency across the entire platform.
## 5.7 Architectural Advantages

The backend architecture provides several advantages:

- Centralized management of monitoring and control.
- Independent communication with monitoring and control nodes.
- Modular software organization.
- Scalable RESTful service architecture.
- Reliable historical data storage.
- Simplified maintenance and future extension.
# 6. ESP8266 Monitoring Node Architecture

## 6.1 Overview

The ESP8266 Monitoring Node is responsible for environmental data acquisition and wireless communication within the IoT Laboratory Monitoring and Control System. Unlike the previous architecture where the ESP8266 functioned only as a communication gateway, the updated architecture promotes the ESP8266 to an independent monitoring node capable of directly interfacing with environmental sensors.

The ESP8266 periodically collects sensor measurements, performs basic data validation, constructs monitoring payloads, and transmits environmental information to the Backend Server through WiFi using MQTT or HTTP protocols.

The internal architecture of the ESP8266 Monitoring Node is illustrated in Figure 6.1.

![ESP8266 Monitoring Node](esp8266-architecture.png)

**Figure 6.1. ESP8266 Monitoring Node Architecture**
## 6.2 Responsibilities

The ESP8266 Monitoring Node performs the following responsibilities:

- Acquire environmental sensor data.
- Read temperature measurements.
- Read humidity measurements.
- Read light intensity measurements.
- Validate sensor readings.
- Construct JSON monitoring payloads.
- Connect to the wireless network.
- Publish monitoring data to the Backend Server.
- Automatically reconnect when communication failures occur.

By integrating sensing and wireless communication into a single embedded platform, the monitoring subsystem becomes simpler, more scalable, and easier to deploy.
## 6.3 Internal Software Components

The ESP8266 firmware is organized into several logical modules.

### Sensor Manager

Responsible for communicating with environmental sensors and collecting measurement values.

Typical sensor operations include:

- Temperature acquisition
- Humidity acquisition
- Light intensity acquisition

---

### WiFi Manager

Maintains the wireless network connection.

Responsibilities include:

- WiFi initialization
- Network authentication
- Automatic reconnection
- Connection status monitoring

---

### Communication Manager

Responsible for communication with the Backend Server.

Functions include:

- MQTT publishing
- HTTP request handling
- Payload transmission
- Response processing

---

### Payload Builder

Converts collected sensor data into JSON messages suitable for cloud communication.

Example payload:

```json
{
  "temperature":28.6,
  "humidity":64.1,
  "light":520
}
```
## 6.4 Communication Workflow

The monitoring node periodically performs the following workflow:

1. Read environmental sensors.
2. Validate sensor values.
3. Construct JSON payload.
4. Establish communication with the Backend Server.
5. Publish monitoring information.
6. Wait for the next sampling interval.

This periodic workflow enables continuous environmental monitoring while minimizing network overhead.
## 6.5 Communication Interfaces

The ESP8266 communicates with other system components using standardized communication protocols.

| Interface | Protocol | Purpose |
|-----------|----------|---------|
| Sensor Interface | GPIO / I2C | Sensor acquisition |
| Backend Server | MQTT / HTTP | Data transmission |
| WiFi Network | IEEE 802.11 b/g/n | Wireless communication |

Unlike the previous system architecture, the ESP8266 no longer communicates with STM32 through UART. Instead, it operates independently as a dedicated monitoring node connected directly to the Backend Server.
## 6.6 Monitoring Data Flow

The monitoring data processing sequence consists of the following stages:

Environmental Sensors

↓

Sensor Manager

↓

Payload Builder

↓

Communication Manager

↓

WiFi Network

↓

Backend Server

Each stage performs an independent responsibility, improving software modularity and simplifying future maintenance.
## 6.7 Architectural Advantages

The ESP8266 Monitoring Node architecture provides several advantages.

### Independent Monitoring

Environmental monitoring operates independently from device control.

### Reduced Hardware Complexity

A single ESP8266 module performs both sensing and wireless communication, eliminating the need for an additional communication gateway.

### Improved Scalability

Additional monitoring nodes can be deployed without modifying the backend software.

### Lower Cost

The integrated architecture reduces hardware components while maintaining reliable monitoring performance.

### Simplified Maintenance

Monitoring firmware can be updated independently from the control subsystem.
# 7. STM32 Control Node Architecture

## 7.1 Overview

The STM32 Control Node is responsible for executing control commands generated by the Backend Server. Unlike the previous architecture where the STM32 handled both sensor acquisition and device control, the updated architecture assigns the STM32 exclusively to control-related operations.

The STM32 receives validated control commands from the Backend Server through the communication service and controls laboratory equipment via GPIO-driven relay modules. This separation of responsibilities simplifies firmware implementation and improves maintainability by isolating monitoring and control functionalities.

The internal architecture of the STM32 Control Node is illustrated in Figure 7.1.

![STM32 Control Node](stm32-architecture.png)

**Figure 7.1. STM32 Control Node Architecture**
## 7.2 Responsibilities

The STM32 Control Node performs the following responsibilities:

- Receive control commands from the Backend Server.
- Parse incoming control messages.
- Control relay modules through GPIO interfaces.
- Operate laboratory equipment such as ventilation fans and lighting systems.
- Activate warning devices including LEDs and buzzers.
- Maintain current device states.
- Report execution status to the Backend Server when required.

The STM32 no longer performs environmental sensing tasks, allowing firmware resources to focus entirely on reliable device control.
## 7.3 Internal Software Components

The STM32 firmware is organized into several functional modules.

### Command Receiver

Responsible for receiving control messages from the communication layer.

Its responsibilities include:

- Command reception
- Message buffering
- Communication validation

---

### Command Parser

Interprets received control messages and converts them into executable control actions.

Typical operations include:

- Command decoding
- Parameter extraction
- Action identification

---

### Device Controller

Responsible for controlling laboratory equipment through GPIO outputs.

Supported devices include:

- Ventilation Fan
- Lighting System
- Relay Modules
- Warning LED
- Buzzer

---

### GPIO Driver

Provides hardware abstraction for digital output control.

This module isolates hardware-specific implementation from application logic, improving firmware portability and maintainability.
## 7.4 Control Workflow

The STM32 executes control commands according to the following workflow:

1. Wait for an incoming control command.
2. Receive and validate the command.
3. Parse the command content.
4. Identify the target device.
5. Activate or deactivate the corresponding GPIO outputs.
6. Update the current device status.
7. Return execution status when required.

This workflow ensures reliable and deterministic control of laboratory equipment.
## 7.5 Communication Interfaces

The STM32 communicates with the remaining system components through dedicated communication interfaces.

| Interface | Purpose |
|-----------|---------|
| Control Service | Receive control commands |
| GPIO | Relay control |
| GPIO | LED control |
| GPIO | Buzzer control |

Unlike the previous system architecture, the STM32 no longer communicates directly with environmental sensors. Sensor acquisition has been completely migrated to the ESP8266 Monitoring Node.
## 7.6 Device Control Flow

The internal device control process follows the sequence below.

Backend Server

↓

Control Command

↓

Command Receiver

↓

Command Parser

↓

Device Controller

↓

GPIO Driver

↓

Relay Module

↓

Laboratory Equipment

This workflow minimizes firmware complexity by separating communication, command interpretation, and hardware control into independent software modules.
## 7.7 Architectural Advantages

The STM32 Control Node architecture provides several benefits.

### Dedicated Control Processing

The STM32 focuses exclusively on executing control commands, improving response reliability.

### Reduced Firmware Complexity

Removing sensor acquisition significantly simplifies firmware development.

### Better Modularity

Monitoring and control firmware evolve independently without affecting one another.

### Higher Maintainability

Control logic can be modified without changing monitoring software.

### Improved Reliability

Separating monitoring and control minimizes the impact of failures occurring in either subsystem.
# 8. Communication Architecture

## 8.1 Overview

Communication is a fundamental component of the IoT Laboratory Monitoring and Control System, enabling seamless interaction between users, cloud services, monitoring nodes, and control nodes.

The proposed architecture adopts standardized communication protocols to ensure reliable, scalable, and loosely coupled interactions among software components. Unlike the previous architecture, communication no longer relies on direct UART transmission between ESP8266 and STM32. Instead, the Backend Server serves as the centralized communication hub responsible for coordinating both monitoring and control operations.

The overall communication architecture is illustrated in Figure 8.1.

![Communication Architecture](communication-diagram.png)

**Figure 8.1. Communication Architecture**
## 8.2 Communication Model

The communication architecture follows a centralized client-server model.

In this model, all software components communicate through the Backend Server rather than directly interacting with each other. This design minimizes coupling between embedded devices while simplifying software maintenance and future expansion.

The communication model consists of the following participants:

- Frontend Dashboard
- Backend Server
- ESP8266 Monitoring Node
- STM32 Control Node
- MySQL Database

Each participant performs a dedicated communication role within the overall system architecture.
## 8.3 Communication Interfaces

The system employs multiple communication protocols according to the responsibilities of each subsystem.

| Source | Destination | Protocol | Purpose |
|---------|-------------|----------|---------|
| User | Frontend Dashboard | HTTPS | User interaction |
| Frontend Dashboard | Backend Server | REST API | Request and response |
| ESP8266 Monitoring Node | Backend Server | MQTT / HTTP | Sensor data transmission |
| Backend Server | MySQL Database | SQL | Persistent data storage |
| Backend Server | STM32 Control Node | Control Service | Device control commands |
| STM32 Control Node | Relay Module | GPIO | Hardware control |

Each protocol is selected based on communication requirements such as reliability, scalability, response time, and implementation complexity.
## 8.4 Monitoring Communication

Environmental monitoring begins at the ESP8266 Monitoring Node.

The ESP8266 periodically reads environmental sensors and packages the collected information into JSON payloads. The monitoring data is then transmitted to the Backend Server using MQTT or HTTP over a WiFi connection.

After receiving the data, the Backend Server validates the incoming payload, stores it in the MySQL database, and makes the information available to the Frontend Dashboard through REST APIs.

This communication process enables users to monitor laboratory conditions in real time while maintaining centralized data management.
## 8.5 Control Communication

Remote device control follows a separate communication path.

Users submit control requests through the Frontend Dashboard. These requests are forwarded to the Backend Server using REST APIs.

After validating the request and determining the required control action, the Backend Server generates a control command and transmits it to the STM32 Control Node.

The STM32 parses the received command and activates the corresponding GPIO outputs to control relay modules connected to laboratory equipment.

This architecture separates monitoring communication from control communication, improving software modularity and simplifying firmware implementation.
## 8.6 Communication Reliability

To ensure reliable communication, the system incorporates several mechanisms.

### WiFi Reconnection

The ESP8266 automatically reconnects to the wireless network whenever the connection is interrupted.

### Data Validation

Incoming monitoring data is validated by the Backend Server before database insertion.

### Request Validation

Control requests received from the Frontend Dashboard are verified before execution to prevent invalid device operations.

### Database Consistency

The Backend Server guarantees that validated monitoring records are successfully stored before they become available to users.
## 8.7 Architectural Advantages

The proposed communication architecture provides several advantages.

### Centralized Communication

All monitoring and control operations are coordinated through the Backend Server, reducing direct dependencies between embedded devices.

### Loose Coupling

Each subsystem communicates through standardized interfaces rather than hardware-specific connections.

### Improved Scalability

Additional monitoring nodes or control nodes can be integrated without modifying existing communication mechanisms.

### Better Maintainability

Changes to one subsystem have minimal impact on the remaining software components.

### Higher Reliability

Separating monitoring communication from control communication improves overall system robustness and simplifies fault isolation.
# 9. Data Flow Architecture

## 9.1 Overview

The Data Flow Architecture describes how information moves throughout the IoT Laboratory Monitoring and Control System during both monitoring and control operations.

The proposed architecture separates monitoring data from control commands, allowing each type of information to follow an independent processing path. This separation improves software maintainability, reduces subsystem coupling, and simplifies future expansion.

The overall data flow is illustrated in Figure 9.1.

![System Data Flow](data-flow.png)

**Figure 9.1. System Data Flow**
## 9.2 Monitoring Data Flow

Environmental monitoring begins at the ESP8266 Monitoring Node.

The monitoring workflow consists of the following stages:

1. Environmental sensors acquire temperature, humidity, and light intensity.
2. The ESP8266 reads sensor measurements through hardware interfaces.
3. Sensor values are validated and converted into a JSON payload.
4. The payload is transmitted to the Backend Server using MQTT or HTTP.
5. The Backend validates incoming data.
6. Validated records are stored in the MySQL database.
7. The Frontend Dashboard retrieves the latest information through REST APIs.
8. Users monitor environmental conditions in real time.

This workflow ensures continuous environmental monitoring while maintaining centralized data management.
## 9.3 Control Command Flow

The control workflow begins with user interaction.

The control sequence proceeds as follows:

1. A user submits a control request through the Frontend Dashboard.
2. The request is forwarded to the Backend Server.
3. The Backend validates the request.
4. A control command is generated.
5. The command is transmitted to the STM32 Control Node.
6. STM32 parses the command.
7. GPIO outputs activate the corresponding relay modules.
8. Laboratory devices change their operating states.

This workflow separates user interaction from embedded hardware execution while maintaining reliable device control.
## 9.4 Data Processing Characteristics

The data flow architecture provides several advantages:

- Separation between monitoring data and control commands.
- Independent monitoring and control pipelines.
- Centralized data validation.
- Reliable historical data storage.
- Support for real-time visualization.
- Easy integration of additional monitoring nodes.
# 10. System Operation Sequence

## 10.1 Overview

The System Operation Sequence illustrates the runtime interaction between major software components during monitoring and control operations.

The sequence diagram focuses on message exchange rather than implementation details, demonstrating how software modules cooperate to provide real-time monitoring and remote laboratory control.

The sequence diagram is shown in Figure 10.1.

![Sequence Diagram](sequence-diagram.png)

**Figure 10.1. System Operation Sequence**
## 10.2 Monitoring Sequence

The monitoring sequence consists of the following operations:

1. Environmental sensors continuously measure laboratory conditions.
2. The ESP8266 Monitoring Node acquires sensor readings.
3. Sensor data is packaged into a JSON payload.
4. The payload is transmitted to the Backend Server.
5. The Backend validates incoming data.
6. Validated data is stored in the MySQL database.
7. The Frontend Dashboard requests updated monitoring information.
8. The Backend returns the latest monitoring records.
9. Users observe environmental conditions in real time.
## 10.3 Control Sequence

Remote device control follows a separate sequence.

1. The user submits a control request.
2. The Frontend Dashboard sends the request to the Backend Server.
3. The Backend validates user permissions and request parameters.
4. A control command is generated.
5. The command is transmitted to the STM32 Control Node.
6. STM32 executes the requested control action.
7. GPIO outputs activate the corresponding relay module.
8. Device status is updated.
9. The Backend reports the execution result to the Frontend Dashboard.
## 10.4 Sequence Characteristics

The sequence architecture provides the following benefits:

- Clear separation between monitoring and control.
- Centralized processing by the Backend Server.
- Reduced coupling between embedded devices.
- Deterministic control execution.
- Reliable monitoring updates.
# 11. Deployment Architecture

## 11.1 Overview

The Deployment Architecture describes how software components are physically distributed across hardware platforms within the IoT Laboratory Monitoring and Control System.

Unlike the logical architecture presented previously, this chapter focuses on runtime deployment.
## 11.2 Deployment Components

The deployed system consists of the following hardware platforms:

- User Computer
- Backend Server
- MySQL Database Server
- ESP8266 Monitoring Node
- STM32 Control Node
- Environmental Sensors
- Relay Modules
## 11.3 Deployment Relationships

The deployment relationships are summarized below.

| Component | Deployment Platform |
|------------|--------------------|
| Frontend Dashboard | User Web Browser |
| Backend Server | Cloud / Local Server |
| Database | MySQL Server |
| ESP8266 Monitoring Node | Embedded Device |
| STM32 Control Node | Embedded Controller |

Communication between these components is performed through standard network and hardware interfaces.
## 11.4 Deployment Advantages

The deployment architecture provides:

- Independent embedded devices.
- Centralized backend processing.
- Flexible deployment.
- Easy node expansion.
- Simplified maintenance.
# 12. Design Characteristics

The proposed software architecture follows several software engineering principles.

## Layered Architecture

The system is organized into logical layers that separate presentation, business logic, communication, and embedded hardware.

## Separation of Responsibilities

Monitoring and control functionalities are deployed on different embedded platforms.

## Loose Coupling

Subsystems communicate through standardized interfaces rather than direct hardware dependencies.

## Scalability

Additional monitoring nodes or control nodes can be integrated with minimal software modification.

## Maintainability

Independent software modules simplify testing, debugging, and future upgrades.

## Reliability

Centralized validation and standardized communication improve overall system reliability.

## Extensibility

The architecture allows future integration of additional sensors, devices, and communication protocols without redesigning the entire system.
# 13. Conclusion

This Architecture Document has presented the complete software architecture of the IoT Laboratory Monitoring and Control System.

The proposed architecture separates monitoring and control responsibilities into dedicated embedded nodes while centralizing data processing and system management within the Backend Server.

The ESP8266 Monitoring Node is responsible for environmental data acquisition and wireless communication, whereas the STM32 Control Node focuses exclusively on laboratory device control. Communication between software components is achieved through standardized protocols including REST APIs, MQTT/HTTP, SQL, and GPIO interfaces.

The layered architecture improves modularity, maintainability, scalability, and reliability, providing a solid foundation for future system development and deployment.

Overall, the proposed architecture satisfies the project requirements for real-time environmental monitoring, remote device control, centralized data management, and future extensibility.