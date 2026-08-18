const API_BASE_URL = "http://localhost:5000/api"

// ================================
// Dashboard
// Lấy dữ liệu cảm biến mới nhất
// ================================
export async function getLatestSensorData() {
  const response = await fetch(
    `${API_BASE_URL}/sensor/latest`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch latest sensor data")
  }

  return response.json()
}


// ================================
// History
// Lấy dữ liệu lịch sử cảm biến
// ================================
export async function getSensorHistory() {
  const response = await fetch(
    `${API_BASE_URL}/sensor/history`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch sensor history")
  }

  return response.json()
}


// ================================
// Alerts
// Lấy lịch sử cảnh báo
// ================================
export async function getAlerts() {
  const response = await fetch(
    `${API_BASE_URL}/alerts`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch alerts")
  }

  return response.json()
}


// ================================
// Device Control
// ================================
export async function controlDevice(deviceData) {
  const response = await fetch(
    `${API_BASE_URL}/device/control`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deviceData),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to control device")
  }

  return response.json()
}


// ================================
// Settings
// ================================
export async function updateSettings(settings) {
  const response = await fetch(
    `${API_BASE_URL}/settings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update settings")
  }

  return response.json()
}


// ================================
// Login
// ================================
export async function login(username, password) {
  const response = await fetch(
    `${API_BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  )

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}