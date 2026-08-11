import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Device from "./pages/Device"
import History from "./pages/History"
import Alerts from "./pages/Alerts"
import Setting from "./pages/Setting"

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <aside className="sidebar">

          <div className="logo">
            <div className="logo-icon">
              ⚙
            </div>

            <div>
              <strong>Lab IoT</strong>
              <span>Monitoring System</span>
            </div>
          </div>

          <nav className="navigation">

            <p className="nav-title">
              MAIN MENU
            </p>

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span>📊</span>
              Dashboard
            </NavLink>

            <NavLink
              to="/device"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span>⚙️</span>
              Device Control
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span>📋</span>
              History
            </NavLink>

            <NavLink
              to="/alerts"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span>🔔</span>
              Alert History
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span>⚙️</span>
              Settings
            </NavLink>

          </nav>

          <div className="sidebar-footer">
            <span className="online-dot"></span>
            System Online
          </div>

        </aside>

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/device"
              element={<Device />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/alerts"
              element={<Alerts />}
            />

            <Route
              path="/settings"
              element={<Setting />}
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  )
}

export default App