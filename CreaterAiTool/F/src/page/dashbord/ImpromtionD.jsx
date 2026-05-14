import React, { useState } from "react";

function ImprovementD() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!title || !desc) return;

    const newItem = {
      id: Date.now(),
      title,
      desc,
    };

    setItems([...items, newItem]);
    setTitle("");
    setDesc("");
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚀 Improvement Tracker</h2>

      {/* Form */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          placeholder="Improvement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={styles.textarea}
        />

        <button type="submit" style={styles.addBtn}>
          Add
        </button>
      </form>

      {/* List */}
      <div style={styles.list}>
        {items.length === 0 && <p>No improvements added yet 👀</p>}

        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>

            <button
              onClick={() => handleDelete(item.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
    backgroundColor: "#f8f9ff",
  },
  heading: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
  },
  textarea: {
    padding: "8px",
  },
  addBtn: {
    padding: "8px",
    backgroundColor: "#4cafef",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default ImprovementD;
