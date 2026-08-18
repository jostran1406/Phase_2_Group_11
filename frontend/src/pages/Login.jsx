import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/api"

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    if (!username || !password) {
      setError("Please enter username and password.")
      return
    }

    try {
      setLoading(true)

      const data = await login(
        username,
        password
      )

      if (data.status === "success") {
        localStorage.setItem(
          "isLoggedIn",
          "true"
        )

        localStorage.setItem(
          "username",
          username
        )

        navigate("/")
      } else {
        setError(
          data.message ||
          "Invalid username or password."
        )
      }

    } catch (error) {
      setError(
        "Cannot connect to the server."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-logo">
            ⚙
          </div>

          <h1>Lab IoT</h1>

          <p>
            Monitoring System
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <label>
            Username

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
            />
          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login