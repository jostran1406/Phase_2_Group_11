import { useState } from "react"
import { controlDevice } from "../services/api"

function Device() {
  const [mode, setMode] = useState("auto") // Thêm trạng thái quản lý chế độ auto/manual
  const [devices, setDevices] = useState({
    fan: false,
    light: false,
    exhaust: false, // Đổi từ buzzer thành exhaust theo chuẩn backend/STM32 mới
  })

  const [loadingDevice, setLoadingDevice] = useState(null)
  const [error, setError] = useState(null)

  // Hàm chuyển đổi chế độ Auto / Manual
  const toggleMode = (newMode) => {
    setMode(newMode)
    // Nếu có API đổi mode, bạn có thể gọi thêm ở đây
  }

  const toggleDevice = async (device) => {
    if (mode === "auto") return // Chế độ auto khóa không cho phép bật/tắt thủ công

    const newState = !devices[device]

    try {
      setLoadingDevice(device)
      setError(null)

      // Giữ nguyên logic gọi API cũ của bạn
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
      id: "exhaust",
      name: "Exhaust Fan",
      icon: "💨",
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

      {/* Thêm cụm nút chuyển đổi Auto / Manual Mode ở đây */}
      <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h2>System Mode</h2>
          <p>Switch between Automatic and Manual control</p>
        </div>

        <div style={{ display: "flex", gap: "10px", background: "#e2e8f0", padding: "5px", borderRadius: "8px" }}>
          <button 
            onClick={() => toggleMode("auto")}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              background: mode === "auto" ? "#2563eb" : "transparent",
              color: mode === "auto" ? "#fff" : "#475569",
              transition: "all 0.2s"
            }}
          >
            Auto Mode
          </button>

          <button 
            onClick={() => toggleMode("manual")}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              background: mode === "manual" ? "#2563eb" : "transparent",
              color: mode === "manual" ? "#fff" : "#475569",
              transition: "all 0.2s"
            }}
          >
            Manual Mode
          </button>
        </div>
      </div>

      <div className="device-panel">

        <div className="panel-header">
          <h2>Connected Devices</h2>
          <p>{mode === "auto" ? "🔒 Devices are locked in Auto mode" : "Manual device control"}</p>
        </div>

        {/* Làm mờ danh sách thiết bị khi ở chế độ Auto */}
        <div className="device-list" style={{ opacity: mode === "auto" ? 0.6 : 1, transition: "opacity 0.3s ease" }}>

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
                disabled={loadingDevice === device.id || mode === "auto"} // Khóa nút bấm khi đang loading hoặc đang ở chế độ Auto
                onClick={() =>
                  toggleDevice(device.id)
                }
                title={mode === "auto" ? "Switches are locked in Auto mode" : ""}
                style={{ cursor: mode === "auto" ? "not-allowed" : "pointer" }}
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