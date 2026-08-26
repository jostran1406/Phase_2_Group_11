import { useState, useEffect } from "react"

function Setting() {
  const [settings, setSettings] = useState({
    temperature: 35,
    gas_ppm: 100,
    light: 900
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  // 1. Tải cấu hình hiện tại từ Database/Backend khi vào trang
  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/api/settings")
      if (response.ok) {
        const data = await response.json()
        // Nếu backend trả về một object cài đặt, cập nhật lại state
        setSettings({
          temperature: data.temperature ?? 35,
          gas_ppm: data.gas_ppm ?? data.air_quality ?? 100,
          light: data.light ?? 900
        })
      }
    } catch (err) {
      console.error("Failed to load settings:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  // Xử lý khi thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  // 2. Lưu cấu hình xuống Database khi bấm Save
  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch("http://localhost:3000/api/settings", {
        method: "PUT", // Hoặc POST tùy cấu hình route backend của nhóm bạn
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(settings)
      })

      if (!response.ok) throw new Error("Failed to save settings")

      setMessage({ type: "success", text: "✅ Settings saved successfully to Database!" })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: "error", text: "❌ Failed to save settings to server." })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page" style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header trang */}
      <div className="page-header" style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 5px 0" }}>System Settings</h1>
        <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
          Configure environmental monitoring thresholds for auto mode and alerts
        </p>
      </div>

      {message && (
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontSize: "14px",
          background: message.type === "success" ? "#f0fdf4" : "#fee2e2",
          color: message.type === "success" ? "#16a34a" : "#dc2626",
          border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}`
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0", padding: "30px" }}>
        
        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>Loading settings from database...</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

            {/* Ngưỡng Nhiệt độ */}
            <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", color: "#1e293b", marginBottom: "5px" }}>Temperature Threshold</h3>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>Maximum allowable temperature before triggering a warning or fan action.</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", maxWidth: "300px" }}>
                <input
                  type="number"
                  name="temperature"
                  value={settings.temperature}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
                <span style={{ fontWeight: "600", color: "#475569" }}>°C</span>
              </div>
            </div>

            {/* Ngưỡng Khí Gas */}
            <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", color: "#1e293b", marginBottom: "5px" }}>Gas Concentration Threshold</h3>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>Maximum safe ppm level for air quality / hazardous gas detection.</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", maxWidth: "300px" }}>
                <input
                  type="number"
                  name="gas_ppm"
                  value={settings.gas_ppm}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
                <span style={{ fontWeight: "600", color: "#475569" }}>ppm</span>
              </div>
            </div>

            {/* Ngưỡng Ánh sáng */}
            <div style={{ paddingBottom: "10px" }}>
              <h3 style={{ fontSize: "16px", color: "#1e293b", marginBottom: "5px" }}>Light Intensity Threshold</h3>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>Target light level for laboratory illumination control.</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", maxWidth: "300px" }}>
                <input
                  type="number"
                  name="light"
                  value={settings.light}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
                <span style={{ fontWeight: "600", color: "#475569" }}>lux</span>
              </div>
            </div>

            {/* Nút Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)"
                }}
              >
                {saving ? "Saving to Database..." : "Save Settings"}
              </button>
            </div>

          </div>
        )}

      </form>

    </div>
  )
}

export default Setting