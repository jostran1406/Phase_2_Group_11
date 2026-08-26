import { useState, useEffect } from "react"

function DeviceControl() {
  const [mode, setMode] = useState("auto") // Quản lý chế độ "auto" hoặc "manual"
  const [devices, setDevices] = useState({
    fan: false,
    light: false,
    exhaust: false,
  })

  // 1. Hàm thay đổi chế độ Auto / Manual và gọi API đồng bộ xuống Backend
  const toggleMode = async (newMode) => {
    try {
      setMode(newMode)
      // Tùy chọn gọi API lưu mode lên backend:
      // await fetch("http://localhost:3000/api/device/mode", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ mode: newMode })
      // })
    } catch (err) {
      console.error("Failed to update mode:", err)
    }
  }

  // 2. Hàm bật/tắt thiết bị thủ công khi ở chế độ Manual
  const toggleDevice = async (deviceKey) => {
    if (mode === "auto") return // Khóa tuyệt đối khi ở chế độ Auto

    const newStatus = !devices[deviceKey]

    // Cập nhật giao diện trước cho mượt (Optimistic Update)
    setDevices((prev) => ({
      ...prev,
      [deviceKey]: newStatus,
    }))

    try {
      // Gọi API gửi lệnh điều khiển thiết bị xuống backend
      // await fetch("http://localhost:3000/api/device/control", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: deviceKey, status: newStatus })
      // })
    } catch (err) {
      console.error("Failed to control device:", err)
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
    <div className="device-panel">
      <div className="panel-header">
        <div>
          <h2>Device Control</h2>
          <p>Manual device control & System mode</p>
        </div>

        {/* Cụm nút chuyển đổi chế độ Auto / Manual */}
        <div className="mode-selector" style={{ display: "flex", gap: "10px" }}>
          <button 
            className={mode === "auto" ? "save-button active" : "save-button"}
            onClick={() => toggleMode("auto")}
          >
            Auto Mode
          </button>
          <button 
            className={mode === "manual" ? "save-button active" : "save-button"}
            onClick={() => toggleMode("manual")}
          >
            Manual Mode
          </button>
        </div>
      </div>

      {/* Hiển thị mờ đi một chút khi ở chế độ Auto để báo hiệu đang bị khóa */}
      <div className="device-list" style={{ opacity: mode === "auto" ? 0.6 : 1, transition: "opacity 0.3s ease" }}>
        {deviceList.map((device) => (
          <div className="device-item" key={device.id}>
            <div className="device-info">
              <span className="device-icon">
                {device.icon}
              </span>
              <div>
                <strong>{device.name}</strong>
                <span className={devices[device.id] ? "device-on" : "device-off"}>
                  {devices[device.id] ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            <button
              className={devices[device.id] ? "toggle active" : "toggle"}
              onClick={() => toggleDevice(device.id)}
              disabled={mode === "auto"} // Khóa nút bấm khi đang ở chế độ Auto
              title={mode === "auto" ? "Switches are locked in Auto mode" : ""}
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