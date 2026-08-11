import { useState } from "react"

function Alerts() {

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "High Temperature",
      sensor: "Temperature",
      value: "32.5 °C",
      time: "Today, 10:32",
      severity: "Critical",
      status: "New"
    },
    {
      id: 2,
      type: "High Humidity",
      sensor: "Humidity",
      value: "82 %",
      time: "Today, 09:15",
      severity: "Warning",
      status: "Acknowledged"
    },
    {
      id: 3,
      type: "Low Light",
      sensor: "Light",
      value: "120 lux",
      time: "Yesterday, 16:42",
      severity: "Warning",
      status: "Resolved"
    },
    {
      id: 4,
      type: "High Temperature",
      sensor: "Temperature",
      value: "31.8 °C",
      time: "Yesterday, 14:20",
      severity: "Critical",
      status: "Resolved"
    }
  ])

  const acknowledgeAlert = (id) => {

    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Acknowledged"
            }
          : alert
      )
    )
  }

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
            {
              alerts.filter(
                (alert) =>
                  alert.status === "New"
              ).length
            }
          </strong>

          <span>
            New Alerts
          </span>

        </div>

      </div>

      <div className="table-card">

        <div className="table-header">

          <div>
            <strong>Alert Events</strong>

            <span>
              {alerts.length} events
            </span>
          </div>

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

              {alerts.map((alert) => (

                <tr key={alert.id}>

                  <td>
                    <strong>
                      {alert.type}
                    </strong>
                  </td>

                  <td>
                    {alert.sensor}
                  </td>

                  <td>
                    {alert.value}
                  </td>

                  <td>
                    {alert.time}
                  </td>

                  <td>

                    <span
                      className={
                        alert.severity === "Critical"
                          ? "severity critical"
                          : "severity warning"
                      }
                    >
                      {alert.severity}
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
                      {alert.status}
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

        </div>

      </div>

    </div>

  )
}

export default Alerts