// src/page/frontend/Userdata.jsx
import React, { useEffect, useState } from "react";
import {
  getUsers,
  // createUser,
  // updateUser,
  // deleteUser,
} from "../../api/userdataApi";

// import UserPage from "../../features/users/UserPage.jsx";
// import UserForm from "../../features/users/UserForm.jsx";
// import UserList from "../../features/users/UserList.jsx";

function Userdata() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [form, setForm] = useState({ name: "", email: "" });
  // const [editId, setEditId] = useState(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(); // ✅ fixed
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  // const handleChange = (e) =>
  //   setForm({ ...form, [e.target.name]: e.target.value });

  // const resetForm = () => {
  //   setForm({ name: "", email: "" });
  //   setEditId(null);
  // };

  // // Add / Update user
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!form.name || !form.email) return;

  //   try {
  //     if (editId) {
  //       await updateUser(editId, form);

  //       setUsers((prev) =>
  //         prev.map((u) => (u.id === editId ? { ...u, ...form } : u))
  //       );
  //     } else {
  //       const newUser = await createUser(form); // ✅ fixed
  //       setUsers((prev) => [...prev, newUser]);
  //     }

  //     resetForm();
  //   } catch (err) {
  //     console.error("Failed to save user:", err);
  //   }
  // };

  // Edit / Delete handlers
  // const handleEdit = (user) => {
  //   setForm({ name: user.name, email: user.email });
  //   setEditId(user.id);
  // };

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("Delete this user?");
  //   if (!confirmDelete) return;

  //   try {
  //     await deleteUser(id);
  //     setUsers((prev) => prev.filter((u) => u.id !== id));
  //   } catch (err) {
  //     console.error("Delete failed:", err);
  //   }
  // };

  if (loading) {
    return (
      <p style={{ textAlign: "center", fontFamily: "Arial" }}>
        Loading users...
      </p>
    );
  }

  return (
    <>
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          User Management
        </h2>

        {/* Form */}
        {/* <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: 30,
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: 6,
              backgroundColor: "#2ecc71",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: 6,
                backgroundColor: "#95a5a6",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </form> */}

        {/* User list */}
        {users.length === 0 ? (
          <p style={{ textAlign: "center" }}>No users found</p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {users.map((u) => (
              <div
                key={u.id}
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
                  <h4 style={{ margin: "0 0 5px 0" }}>{u.name}</h4>
                  <p style={{ margin: 0, color: "#555" }}>{u.email}</p>
                </div>

                {/* <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => handleEdit(u)}
                    style={{
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: 6,
                      backgroundColor: "#3498db",
                      color: "#fff",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(u.id)}
                    style={{
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: 6,
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Userdata;
