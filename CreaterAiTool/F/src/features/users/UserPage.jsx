import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/userdataApi";
import UserForm from "./UserForm";
import UserList from "./UserList";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState(null);

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers();
      setUsers(data || []);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      setError(null);

      if (editUser) {
        await updateUser(editUser.id, formData);
      } else {
        await createUser(formData);
      }

      setEditUser(null);
      await loadUsers(); // refresh list
    } catch {
      setError("Failed to save user");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      await loadUsers();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>User Management</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Form */}
      <UserForm
        key={editUser ? editUser.id : "new"}
        onSave={handleSave}
        editUser={editUser}
        onCancel={() => setEditUser(null)}
      />

      {/* List */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading users...</p>
      ) : (
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default UserPage;
