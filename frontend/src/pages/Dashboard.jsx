import { useEffect, useState } from "react"
import SensorCard from "../components/SensorCard"
import { getLatestSensorData } from "../services/api"

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    light: null,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadSensorData = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getLatestSensorData()

      setSensorData({
        temperature: data.temperature,
        humidity: data.humidity,
        light: data.light,
      })
    } catch (err) {
      console.error("Failed to load sensor data:", err)
      setError("Unable to load sensor data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSensorData()
  }, [])

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Laboratory Overview</h1>
          <p>Real-time environmental monitoring</p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          System Online
        </div>
      </div>

      <section className="monitoring-section">

        <div className="section-title">
          <div>
            <h2>Environmental Monitoring</h2>
            <p>Current laboratory sensor readings</p>
          </div>

          <button
            className="refresh-button"
            onClick={loadSensorData}
            disabled={loading}
          >
            ↻ {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="sensor-grid">

          <SensorCard
            title="Temperature"
            value={sensorData.temperature ?? "--"}
            unit="°C"
            icon="🌡️"
          />

          <SensorCard
            title="Humidity"
            value={sensorData.humidity ?? "--"}
            unit="%"
            icon="💧"
          />

          <SensorCard
            title="Light Intensity"
            value={sensorData.light ?? "--"}
            unit="lux"
            icon="☀️"
          />

        </div>

      </section>

      <section className="dashboard-summary">

        <div className="summary-card">
          <span className="summary-icon">🌡️</span>

          <div>
            <strong>Temperature</strong>
            <p>Current sensor reading</p>
          </div>

          <span className="normal-badge">
            Normal
          </span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">💧</span>

          <div>
            <strong>Humidity</strong>
            <p>Current sensor reading</p>
          </div>

          <span className="normal-badge">
            Normal
          </span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">☀️</span>

          <div>
            <strong>Light</strong>
            <p>Current sensor reading</p>
          </div>

          <span className="normal-badge">
            Normal
          </span>
        </div>

      </section>

    </div>
  )
}

export default Dashboard