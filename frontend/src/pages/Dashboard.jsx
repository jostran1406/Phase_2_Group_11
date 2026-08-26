import { useEffect, useState } from "react"
import SensorCard from "../components/SensorCard"
import SensorChart from "../components/SensorChart" // Import component biểu đồ
import { getLatestSensorData } from "../services/api"

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    gas_ppm: null,
    light: null,
  })

  // Thêm state chứa mảng dữ liệu lịch sử để vẽ biểu đồ
  const [historyData, setHistoryData] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadSensorData = async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Lấy dữ liệu cảm biến mới nhất cho các thẻ card
      const data = await getLatestSensorData()
      setSensorData({
        temperature: data.temperature,
        gas_ppm: data.gas_ppm,
        light: data.light,
      })

      // 2. (Tùy chọn) Nếu bạn có API lấy lịch sử, hãy gọi ở đây để truyền vào biểu đồ
      // Ví dụ: const history = await getSensorHistory(); setHistoryData(history);
      
    } catch (err) {
      console.error("Failed to load sensor data:", err)
      setError("Unable to load sensor data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSensorData()
    // Tự động làm mới dữ liệu mỗi 5 giây
    const interval = setInterval(loadSensorData, 5000)
    return () => clearInterval(interval)
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

      {/* 1. Khu vực Thẻ giá trị hiện tại */}
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
            title="Gas Concentration"
            value={sensorData.gas_ppm ?? "--"}
            unit="ppm"
            icon="🧪"
          />

          <SensorCard
            title="Light Intensity"
            value={sensorData.light ?? "--"}
            unit="lux"
            icon="☀️"
          />
        </div>
      </section>

      {/* 2. Khu vực Biểu đồ trực quan (Đặt ngay dưới các thẻ card) */}
      <section className="chart-section" style={{ marginBottom: "30px" }}>
        <div className="section-title" style={{ marginBottom: "15px" }}>
          <h2>Sensor Trends</h2>
          <p>Historical data visualization over time</p>
        </div>
        
        {/* Truyền dữ liệu lịch sử vào component biểu đồ */}
        <SensorChart historyData={historyData} />
      </section>

      {/* 3. Khu vực tóm tắt trạng thái */}
      <section className="dashboard-summary">
        <div className="summary-card">
          <span className="summary-icon">🌡️</span>
          <div>
            <strong>Temperature</strong>
            <p>Current sensor reading</p>
          </div>
          <span className="normal-badge">Normal</span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">🧪</span>
          <div>
            <strong>Gas Concentration</strong>
            <p>Current sensor reading</p>
          </div>
          <span className="normal-badge">Normal</span>
        </div>

        <div className="summary-card">
          <span className="summary-icon">☀️</span>
          <div>
            <strong>Light</strong>
            <p>Current sensor reading</p>
          </div>
          <span className="normal-badge">Normal</span>
        </div>
      </section>

    </div>
  )
}

export default Dashboard