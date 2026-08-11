import { useState } from "react"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()

    if (!username || !password) {
      setMessage("Please enter username and password")
      return
    }

    setMessage(`Welcome, ${username}`)
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Login