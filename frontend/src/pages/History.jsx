import { useEffect, useState } from "react"
import { getSensorHistory } from "../services/api"

function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadHistory = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getSensorHistory()

      setHistory(data)
    } catch (err) {
      console.error("Failed to load sensor history:", err)
      setError("Unable to load sensor history")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  return (
    <div className="history">

      <div className="page-header">
        <div>
          <h1>Sensor History</h1>
          <p>Historical environmental sensor data</p>
        </div>

        <button
          className="refresh-button"
          onClick={loadHistory}
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

      <div className="history-panel">

        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Light Intensity</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={item.id ?? index}>
                <td>
                  {item.timestamp ?? item.time ?? "--"}
                </td>

                <td>
                  {item.temperature ?? "--"} °C
                </td>

                <td>
                  {item.humidity ?? "--"} %
                </td>

                <td>
                  {item.light ?? item.lightIntensity ?? "--"} lux
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && history.length === 0 && (
          <div className="empty-state">
            No sensor history available.
          </div>
        )}

      </div>

    </div>
  )
}

export default History