const MOCK_MODE = true

const mockSensorData = {
  temperature: 28.5,
  humidity: 65,
  light: 450,
}

export async function getSensorData() {
  if (MOCK_MODE) {
    return mockSensorData
  }

  const response = await fetch(
    "http://localhost:5000/api/sensors"
  )

  if (!response.ok) {
    throw new Error("Failed to fetch sensor data")
  }

  return response.json()
}