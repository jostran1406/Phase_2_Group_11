import { useState } from "react"
import SensorCard from "../components/SensorCard"

function Dashboard() {
  const [temperature, setTemperature] = useState(28.5)
  const [humidity, setHumidity] = useState(65)
  const [light, setLight] = useState(450)

  const updateSensorData = () => {
    setTemperature((Math.random() * 5 + 26).toFixed(1))
    setHumidity(Math.floor(Math.random() * 20 + 55))
    setLight(Math.floor(Math.random() * 300 + 300))
  }

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
            onClick={updateSensorData}
          >
            ↻ Refresh
          </button>
        </div>

        <div className="sensor-grid">

          <SensorCard
            title="Temperature"
            value={temperature}
            unit="°C"
             icon="🌡️"
          />

          <SensorCard
            title="Humidity"
            value={humidity}
            unit="%"
             icon="💧"
          />

          <SensorCard
            title="Light Intensity"
            value={light}
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
            <p>Within normal range</p>
          </div>
          <span className="normal-badge">Normal</span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">💧</span>
          <div>
            <strong>Humidity</strong>
            <p>Within normal range</p>
          </div>
          <span className="normal-badge">Normal</span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">☀️</span>
          <div>
            <strong>Light</strong>
            <p>Within normal range</p>
          </div>
          <span className="normal-badge">Normal</span>
        </div>

      </section>

    </div>
  )
}

export default Dashboard