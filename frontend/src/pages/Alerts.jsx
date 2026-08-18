import { useEffect, useState } from "react"
import { getAlerts } from "../services/api"

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadAlerts = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getAlerts()

      setAlerts(data)
    } catch (err) {
      console.error("Failed to load alerts:", err)
      setError("Unable to load alert history")
    } finally {
      setLoading(false)
    }
  }

  const acknowledgeAlert = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Acknowledged",
            }
          : alert
      )
    )
  }

  useEffect(() => {
    loadAlerts()
  }, [])

  const newAlerts = alerts.filter(
    (alert) => alert.status === "New"
  ).length

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Alert History</h1>

          <p>
            Monitor environmental alerts and events
          </p>
        </div>

        <div className="alert-summary">

          <strong>
            {newAlerts}
          </strong>

          <span>
            New Alerts
          </span>

        </div>

      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="table-card">

        <div className="table-header">

          <div>
            <strong>
              Alert Events
            </strong>

            <span>
              {alerts.length} events
            </span>
          </div>

          <button
            className="refresh-button"
            onClick={loadAlerts}
            disabled={loading}
          >
            ↻ {loading ? "Loading..." : "Refresh"}
          </button>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Alert</th>
                <th>Sensor</th>
                <th>Value</th>
                <th>Time</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {alerts.map((alert, index) => (

                <tr key={alert.id ?? index}>

                  <td>
                    <strong>
                      {alert.type ?? "--"}
                    </strong>
                  </td>

                  <td>
                    {alert.sensor ?? "--"}
                  </td>

                  <td>
                    {alert.value ?? "--"}
                  </td>

                  <td>
                    {alert.time ?? alert.timestamp ?? "--"}
                  </td>

                  <td>

                    <span
                      className={
                        alert.severity === "Critical"
                          ? "severity critical"
                          : "severity warning"
                      }
                    >
                      {alert.severity ?? "--"}
                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        alert.status === "New"
                          ? "status-badge new"
                          : alert.status === "Resolved"
                          ? "status-badge resolved"
                          : "status-badge active"
                      }
                    >
                      {alert.status ?? "--"}
                    </span>

                  </td>

                  <td>

                    {alert.status === "New" ? (

                      <button
                        className="table-action"
                        onClick={() =>
                          acknowledgeAlert(alert.id)
                        }
                      >
                        Acknowledge
                      </button>

                    ) : (

                      <span>-</span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {!loading && alerts.length === 0 && (
            <div className="empty-state">
              No alerts available.
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Alerts