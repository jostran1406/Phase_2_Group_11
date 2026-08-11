import { useState } from "react"

function Device() {
  const [fan, setFan] = useState(false)
  const [light, setLight] = useState(false)
  const [buzzer, setBuzzer] = useState(false)

  return (
    <div className="device-page">

      {/* Header */}
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

      {/* Device panel */}
      <div className="device-panel">

        <div className="panel-header">
          <h2>Connected Devices</h2>
          <p>Manual device control</p>
        </div>

        <div className="device-list">

          {/* FAN */}
          <div className="device-item">

            <div className="device-info">

              <div className="device-icon">
                🌀
              </div>

              <div>
                <strong>Fan</strong>

                <span className={fan ? "device-on" : "device-off"}>
                  {fan ? "ON" : "OFF"}
                </span>
              </div>

            </div>

            <button
              className={`toggle ${fan ? "active" : ""}`}
              onClick={() => setFan(!fan)}
            >
              <span></span>
            </button>

          </div>


          {/* LIGHT */}
          <div className="device-item">

            <div className="device-info">

              <div className="device-icon">
                💡
              </div>

              <div>
                <strong>Laboratory Light</strong>

                <span className={light ? "device-on" : "device-off"}>
                  {light ? "ON" : "OFF"}
                </span>
              </div>

            </div>

            <button
              className={`toggle ${light ? "active" : ""}`}
              onClick={() => setLight(!light)}
            >
              <span></span>
            </button>

          </div>


          {/* BUZZER */}
          <div className="device-item">

            <div className="device-info">

              <div className="device-icon">
                🔊
              </div>

              <div>
                <strong>Buzzer</strong>

                <span className={buzzer ? "device-on" : "device-off"}>
                  {buzzer ? "ON" : "OFF"}
                </span>
              </div>

            </div>

            <button
              className={`toggle ${buzzer ? "active" : ""}`}
              onClick={() => setBuzzer(!buzzer)}
            >
              <span></span>
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Device