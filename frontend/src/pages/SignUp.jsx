import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/api"

function SignUp() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submit form đã được kích hoạt!")

    setError("")
    setSuccess("")

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setLoading(true)
      console.log("Đang bắt đầu gọi hàm register từ api.js...")

      const data = await register(username, password)
      console.log("Kết quả trả về từ API:", data)

      if (data.status === "success" || data.httpStatus === 201) {
        setSuccess("Account created successfully.")
        setTimeout(() => {
          navigate("/login")
        }, 1000)
      } else {
        setError(data.message || "Registration failed.")
      }

    } catch (error) {
      console.error("Lỗi bắt được trong catch:", error)
      setError("Cannot connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">⚙</div>
          <h1>Create Account</h1>
          <p>Create your Lab IoT account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp