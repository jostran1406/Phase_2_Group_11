import { useState } from "react"

function Users() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyen Van Nhan",
      email: "nhan@example.com",
      role: "Admin",
      status: "Active"
    },
    {
      id: 2,
      name: "Dang Trong Nghia",
      email: "nghia@example.com",
      role: "Engineer",
      status: "Active"
    },
    {
      id: 3,
      name: "Mai Gia Khanh",
      email: "khanh@example.com",
      role: "Engineer",
      status: "Inactive"
    }
  ])

  const toggleStatus = (id) => {

    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active"
            }
          : user
      )
    )
  }

  return (

    <div className="page">

      <div className="page-header">

        <div>
          <h1>User Management</h1>

          <p>
            Manage system users and access roles
          </p>
        </div>

        <button className="primary-button">
          + Add User
        </button>

      </div>

      <div className="table-card">

        <div className="table-header">

          <div>
            <strong>System Users</strong>

            <span>
              {users.length} users
            </span>
          </div>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td>
                    <strong>
                      {user.name}
                    </strong>
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    <span className="role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>

                    <span
                      className={
                        user.status === "Active"
                          ? "status-badge active"
                          : "status-badge inactive"
                      }
                    >
                      {user.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="table-action"
                      onClick={() =>
                        toggleStatus(user.id)
                      }
                    >
                      {user.status === "Active"
                        ? "Disable"
                        : "Enable"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default Users