# Backend API

## POST /login

User authentication.

### Request

```json
{
  "username": "admin",
  "password": "123456"
}
```

### Response

```json
{
  "status": "success",
  "token": "jwt_token"
}
```

## GET /sensor/latest

Return latest environmental data.

### Response

```json
{
  "temperature": 28.5,
  "humidity": 70.2,
  "light": 450,
  "timestamp": "2026-08-05 10:30:00"
}
```

## GET /sensor/history

### Response

```json
[
  {
    "temperature": 28.5,
    "humidity": 70.2,
    "light": 450,
    "timestamp": "2026-08-05 10:30:00"
  }
]
```

## POST /device/control

### Request

```json
{
  "device": "fan",
  "status": true
}
```

### Response

```json
{
  "status": "success"
}
```

## GET /alerts

### Response

```json
[
  {
    "type": "temperature",
    "message": "Temperature exceeds threshold",
    "time": "2026-08-05 10:30:00"
  }
]
```

## POST /settings

### Request

```json
{
  "temperature_threshold": 35,
  "humidity_threshold": 80,
  "light_threshold": 800
}
```

### Response

```json
{
  "status": "success"
}
```

## ESP8266 Sensor Data Upload

### POST /sensor/upload

### Request

```json
{
  "device_id": "NODE_01",
  "temperature": 28.5,
  "humidity": 70.2,
  "light": 450,
  "timestamp": "2026-08-05 10:30:00"
}
```

### Response

```json
{
  "status": "success"
}
```