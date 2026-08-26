import { useState, useEffect } from "react"

function History() {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Hàm gọi API lấy lịch sử cảm biến từ backend
  const fetchHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("http://localhost:3000/api/sensor/history")
      if (!response.ok) throw new Error("Failed to fetch sensor history")
      const data = await response.json()
      setHistoryData(data)
    } catch (err) {
      console.error("Error fetching history:", err)
      setError("Unable to load historical sensor data from server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="page" style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header của trang */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 5px 0" }}>Sensor History</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            Historical environmental sensor data logs
          </p>
        </div>

        <button
          onClick={fetchHistory}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)"
          }}
        >
          {loading ? "Loading..." : "↻ Refresh Data"}
        </button>
      </div>

      {error && (
        <div style={{ color: "#dc2626", background: "#fee2e2", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Khung chứa bảng lịch sử */}
      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" }}>

        <div style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: "16px", color: "#334155" }}>Recorded Logs</strong>
          <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
            {historyData.length} entries
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "14px 24px" }}>Time</th>
                <th style={{ padding: "14px 24px" }}>Temperature (°C)</th>
                <th style={{ padding: "14px 24px" }}>Gas Concentration (ppm)</th>
                <th style={{ padding: "14px 24px", textAlign: "right" }}>Light Intensity (lux)</th>
              </tr>
            </thead>

            <tbody>
              {loading && historyData.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    Loading sensor history...
                  </td>
                </tr>
              ) : historyData.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No history records found in database.
                  </td>
                </tr>
              ) : (
                historyData.map((item, index) => (
                  <tr key={item.id || index} style={{ borderBottom: index !== historyData.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <td style={{ padding: "16px 24px", color: "#475569", fontSize: "13px", fontWeight: "500" }}>
                      {item.time ? new Date(item.time).toLocaleString() : item.created_at || "N/A"}
                    </td>
                    <td style={{ padding: "16px 24px", fontWeight: "600", color: "#ef4444" }}>
                      {item.temperature ?? "--"} °C
                    </td>
                    <td style={{ padding: "16px 24px", fontWeight: "600", color: "#eab308" }}>
                      {item.gas_ppm ?? item.air_quality ?? "--"} ppm
                    </td>
                    <td style={{ padding: "16px 24px", fontWeight: "600", color: "#3b82f6", textAlign: "right" }}>
                      {item.light ?? "--"} lux
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

export default History