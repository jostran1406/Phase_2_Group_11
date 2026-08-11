import { useState } from "react"

function DeviceControl() {
  const [devices, setDevices] = useState({
    fan: false,
    light: false,
    airConditioner: false,
    buzzer: false,
  })

  const toggleDevice = (device) => {
    setDevices((prev) => ({
      ...prev,
      [device]: !prev[device],
    }))
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
      id: "airConditioner",
      name: "Air Conditioner",
      icon: "❄️",
    },
    {
    id: "buzzer",
    name: "Buzzer Alarm",
    icon: "🔊",
  },
  ]

  return (
    <div className="device-panel">

      <div className="panel-header">

        <div>
          <h2>Device Control</h2>

          <p>
            Manual device control
          </p>
        </div>

      </div>

      <div className="device-list">

        {deviceList.map((device) => (

          <div
            className="device-item"
            key={device.id}
          >

            <div className="device-info">

              <span className="device-icon">
                {device.icon}
              </span>

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
              className={
                devices[device.id]
                  ? "toggle active"
                  : "toggle"
              }
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
  )
}

export default DeviceControl