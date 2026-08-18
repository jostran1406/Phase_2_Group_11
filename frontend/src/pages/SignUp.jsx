import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/api"

function SignUp() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    // Validate phía giao diện
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.")
      return
    }

    try {
      setLoading(true)

      // Gọi API đăng ký xuống Backend
      const data = await register(
        form.username,
        form.password
      )

      // Kiểm tra HTTP Status 201 hoặc status success từ backend trả về
      if (data.httpStatus === 201 || data.status === "success") {
        setSuccess("Account created successfully!")
        
        // Tự động chuyển về trang đăng nhập sau 1.5 giây
        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else {
        setError(data.message || "Registration failed. Username might already exist.")
      }

    } catch (error) {
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
          <p>Create your Lab IoT monitoring account</p>
        </div>

        <form onSubmit={handleSubmit}>

          <label>
            Username
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp