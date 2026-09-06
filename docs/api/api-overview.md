# API Overview

## 1. Introduction

The Backend API provides communication between the Frontend Dashboard and the IoT Backend Server.

All APIs use:

- REST Architecture
- JSON Data Format
- HTTP/HTTPS Protocol
Base URL:

```text
http://server-ip/api
```

## 2. Main Functions

The API supports:

- User Authentication
- Sensor Data Retrieval
- Device Control
- Alert Management
- System Configuration

## 3. Response Format

Example Success Response

```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": {}
}
```

Example Error Response

```json
{
  "status": "error",
  "message": "Invalid request"
}
```
