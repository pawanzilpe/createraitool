import React, { useState } from "react";

function UserForm({ onSave, editUser, onCancel }) {
  const [form, setForm] = useState({
    name: editUser?.name || "",
    email: editUser?.email || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("All fields are required");
      return;
    }

    setSaving(true);

    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
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
          padding: 8,
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
          padding: 8,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        disabled={saving}
        style={{
          padding: "8px 16px",
          border: "none",
          borderRadius: 6,
          backgroundColor: "#2ecc71",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {saving ? "Saving..." : editUser ? "Update" : "Add"}
      </button>

      {editUser && (
        <button
          type="button"
          onClick={onCancel}
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
    </form>
  );
}

export default UserForm;
