import { useState } from "react"

function History() {
  const [alerts] = useState([
    {
      time: "10:15",
      type: "Temperature",
      message: "Temperature exceeded 30°C",
      level: "Warning",
    },
    {
      time: "11:30",
      type: "Humidity",
      message: "Humidity exceeded 80%",
      level: "Warning",
    },
    {
      time: "13:05",
      type: "Light",
      message: "Light intensity too low",
      level: "Info",
    },
  ])

  return (
    <div className="history">
      <h1>Alert History</h1>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Message</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.time}</td>
              <td>{alert.type}</td>
              <td>{alert.message}</td>
              <td>{alert.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default History