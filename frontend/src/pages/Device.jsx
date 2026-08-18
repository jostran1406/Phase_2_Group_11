import { useState } from "react"
import { controlDevice } from "../services/api"

function Device() {
  const [devices, setDevices] = useState({
    fan: false,
    light: false,
    buzzer: false,
  })

  const [loadingDevice, setLoadingDevice] = useState(null)
  const [error, setError] = useState(null)

  const toggleDevice = async (device) => {
    const newState = !devices[device]

    try {
      setLoadingDevice(device)
      setError(null)

      await controlDevice({
        device,
        status: newState,
      })

      setDevices((prev) => ({
        ...prev,
        [device]: newState,
      }))
    } catch (err) {
      console.error("Failed to control device:", err)
      setError(`Unable to control ${device}`)
    } finally {
      setLoadingDevice(null)
    }
  }

  const deviceList = [
    {
      id: "fan",
      name: "Fan",
      icon: "🌀",
    },
    {
      id: "light",
      name: "Laboratory Light",
      icon: "💡",
    },
    {
      id: "buzzer",
      name: "Buzzer",
      icon: "🔊",
    },
  ]

  return (
    <div className="device-page">

      <div className="page-header">
        <div>
          <h1>Device Control</h1>
          <p>Monitor and manually control laboratory devices</p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          System Online
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="device-panel">

        <div className="panel-header">
          <h2>Connected Devices</h2>
          <p>Manual device control</p>
        </div>

        <div className="device-list">

          {deviceList.map((device) => (

            <div
              className="device-item"
              key={device.id}
            >

              <div className="device-info">

                <div className="device-icon">
                  {device.icon}
                </div>

                <div>
                  <strong>
                    {device.name}
                  </strong>

                  <span
                    className={
                      devices[device.id]
                        ? "device-on"
                        : "device-off"
                    }
                  >
                    {devices[device.id]
                      ? "ON"
                      : "OFF"}
                  </span>
                </div>

              </div>

              <button
                className={`toggle ${
                  devices[device.id] ? "active" : ""
                }`}
                disabled={loadingDevice === device.id}
                onClick={() =>
                  toggleDevice(device.id)
                }
              >
                <span></span>
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Device