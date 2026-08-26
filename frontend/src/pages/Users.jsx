import { useState, useEffect } from "react"

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1. Gọi API lấy danh sách user từ Database khi trang được tải
  const fetchUsers = async () => {
    try {
      setLoading(true)
      // Thay đổi đường dẫn '/api/users' nếu route backend của bạn khác nhé
      const response = await fetch("http://localhost:3000/api/users") 
      if (!response.ok) throw new Error("Failed to fetch users")
      
      const data = await response.json()
      setUsers(data) // Đưa dữ liệu từ database vào state
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Unable to load users from database")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // 2. Hàm gọi API cập nhật trạng thái (Enable/Disable) xuống Database
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active"

    try {
      // Gọi API cập nhật trạng thái user trong database
      // const response = await fetch(`http://localhost:3000/api/users/${id}/status`, {
      //   method: "PUT", // hoặc PATCH tùy backend của bạn
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: newStatus })
      // })

      // Cập nhật giao diện tạm thời sau khi gọi API thành công
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      )
    } catch (err) {
      console.error("Failed to update user status:", err)
      alert("Failed to update status")
    }
  }

  return (
    <div className="page" style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header trang */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 5px 0" }}>User Management</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            Manage system users and access roles from Database
          </p>
        </div>

        <button 
          className="primary-button"
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
          onClick={() => alert("Open Add User Modal/Form")}
        >
          + Add User
        </button>
      </div>

      {error && (
        <div style={{ color: "#dc2626", background: "#fee2e2", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Khung chứa bảng */}
      <div className="table-card" style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" }}>

        <div className="table-header" style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ fontSize: "16px", color: "#334155", marginRight: "10px" }}>System Users</strong>
            <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
              {users.length} users
            </span>
          </div>
        </div>

        <div className="table-wrapper" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "14px 24px" }}>Name</th>
                <th style={{ padding: "14px 24px" }}>Email</th>
                <th style={{ padding: "14px 24px" }}>Role</th>
                <th style={{ padding: "14px 24px" }}>Status</th>
                <th style={{ padding: "14px 24px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    Loading users from database...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    No users found in database.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id || index} style={{ borderBottom: index !== users.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <td style={{ padding: "16px 24px" }}>
                      <strong style={{ color: "#1e293b", fontWeight: "600" }}>
                        {user.name || user.username}
                      </strong>
                    </td>

                    <td style={{ padding: "16px 24px", color: "#64748b", fontSize: "14px" }}>
                      {user.email}
                    </td>

                    <td style={{ padding: "16px 24px" }}>
                      <span 
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: user.role === "Admin" ? "#fef3c7" : "#e0e7ff",
                          color: user.role === "Admin" ? "#b45309" : "#3730a3"
                        }}
                      >
                        {user.role || "User"}
                      </span>
                    </td>

                    <td style={{ padding: "16px 24px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          fontWeight: "500",
                          color: user.status === "Active" || user.is_active ? "#16a34a" : "#dc2626"
                        }}
                      >
                        <span style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: user.status === "Active" || user.is_active ? "#16a34a" : "#dc2626"
                        }}></span>
                        {user.status || (user.is_active ? "Active" : "Inactive")}
                      </span>
                    </td>

                    <td style={{ padding: "16px 24px", textAlign: "right" }}>
                      <button
                        onClick={() => toggleStatus(user.id, user.status)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: user.status === "Active" ? "#cbd5e1" : "#bbf7d0",
                          background: user.status === "Active" ? "#f8fafc" : "#f0fdf4",
                          color: user.status === "Active" ? "#475569" : "#16a34a",
                          transition: "all 0.2s"
                        }}
                      >
                        {user.status === "Active" ? "Disable" : "Enable"}
                      </button>
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

export default Users