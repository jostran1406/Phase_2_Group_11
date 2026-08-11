function AlertPanel({ temperature, humidity }) {
  const alerts = []

  if (temperature > 30) {
    alerts.push({
      type: "Temperature",
      message: "Temperature is too high",
      level: "Warning",
    })
  }

  if (humidity > 80) {
    alerts.push({
      type: "Humidity",
      message: "Humidity is too high",
      level: "Warning",
    })
  }

  return (
    <div className="alert-panel">
      <h2>Alerts</h2>

      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index}>
            <strong>{alert.level}</strong>
            <p>
              {alert.type}: {alert.message}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default AlertPanel