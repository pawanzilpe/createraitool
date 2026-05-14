import React from "react";

function UserList({ users, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>No users found</p>;
  }

  return (
    <div style={{ display: "grid", gap: 15 }}>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 5px 0" }}>{user.name}</h4>
            <p style={{ margin: 0, color: "#555" }}>{user.email}</p>
          </div>

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => onEdit(user)}
              style={{
                marginRight: 10,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                backgroundColor: "#3498db",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(user.id)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                backgroundColor: "#e74c3c",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
