import { useState, useEffect } from "react"

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Hàm gọi API lấy lịch sử cảnh báo từ backend
  const fetchAlerts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("http://localhost:3000/api/alerts")
      if (!response.ok) throw new Error("Failed to fetch alerts")
      const data = await response.json()
      setAlerts(data)
    } catch (err) {
      console.error("Error fetching alerts:", err)
      setError("Unable to load alert history from server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  return (
    <div className="page" style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header của trang */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 5px 0" }}>Alert History</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            Monitor environmental alerts and system events
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Huy hiệu đếm tổng số cảnh báo mới */}
          <div style={{ background: "#fff", padding: "8px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#d97706" }}>{alerts.length}</span>
            <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Total Alerts</span>
          </div>

          <button
            onClick={fetchAlerts}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)"
            }}
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: "#dc2626", background: "#fee2e2", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Khung chứa bảng dữ liệu cảnh báo */}
      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" }}>

        <div style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: "16px", color: "#334155" }}>Alert Events</strong>
          <span style={{ background: "#fef3c7", color: "#b45309", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
            {alerts.length} events recorded
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "14px 24px" }}>Alert Type</th>
                <th style={{ padding: "14px 24px" }}>Sensor</th>
                <th style={{ padding: "14px 24px" }}>Value</th>
                <th style={{ padding: "14px 24px" }}>Time</th>
                <th style={{ padding: "14px 24px" }}>Severity</th>
                <th style={{ padding: "14px 24px", textAlign: "right" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && alerts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    Loading alert logs...
                  </td>
                </tr>
              ) : alerts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    ✅ No alerts available. System is operating normally.
                  </td>
                </tr>
              ) : (
                alerts.map((item, index) => (
                  <tr key={item.id || index} style={{ borderBottom: index !== alerts.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <td style={{ padding: "16px 24px", fontWeight: "600", color: "#1e293b" }}>
                      {item.message || item.type || "Threshold Exceeded"}
                    </td>
                    <td style={{ padding: "16px 24px", color: "#475569" }}>
                      {item.sensor || item.device || "Environment"}
                    </td>
                    <td style={{ padding: "16px 24px", color: "#dc2626", fontWeight: "600" }}>
                      {item.value ?? "--"}
                    </td>
                    <td style={{ padding: "16px 24px", color: "#64748b", fontSize: "13px" }}>
                      {item.time ? new Date(item.time).toLocaleString() : item.created_at || "Just now"}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: "#fee2e2",
                        color: "#dc2626"
                      }}>
                        {item.severity || "Warning"}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "right" }}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: "#fef3c7",
                        color: "#b45309"
                      }}>
                        {item.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default Alerts