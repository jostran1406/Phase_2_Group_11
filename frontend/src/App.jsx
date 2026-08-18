import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Device from "./pages/Device"
import History from "./pages/History"
import Alerts from "./pages/Alerts"
import Setting from "./pages/Setting"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Users from "./pages/Users"

// ==========================================
// 1. TẠO KHUNG GIAO DIỆN CÓ SIDEBAR (Dành cho trang bên trong)
// ==========================================
function MainLayout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">⚙</div>
          <div>
            <strong>Lab IoT</strong>
            <span>Monitoring System</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="nav-title">MAIN MENU</p>

          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <span>📊</span> Dashboard
          </NavLink>

          <NavLink to="/device" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <span>⚙️</span> Device Control
          </NavLink>

          <NavLink to="/history" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <span>📋</span> History
          </NavLink>

          <NavLink to="/users" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <span>👥</span> User Management
          </NavLink>

          <NavLink to="/alerts" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <span>🔔</span> Alert History
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <span>⚙️</span> Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <span className="online-dot"></span>
          System Online
        </div>
      </aside>

      <main className="main-content">
        {/* React Router sẽ "bơm" nội dung các trang (Dashboard, History...) vào vị trí Outlet này */}
        <Outlet />
      </main>
    </div>
  )
}

// ==========================================
// 2. PHÂN LUỒNG ĐỊNH TUYẾN 
// ==========================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NHÓM 1: CÁC TRANG KHÔNG CÓ SIDEBAR (Đứng tự do) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* NHÓM 2: CÁC TRANG CÓ SIDEBAR (Bọc bên trong MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/device" element={<Device />} />
          <Route path="/history" element={<History />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App