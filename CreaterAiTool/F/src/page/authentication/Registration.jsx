import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", formData);

      const loginResponse = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = loginResponse.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`Welcome, ${user.name}! You are now logged in.`);

      navigate("/dash/home");
    } catch (error) {
      console.error("Registration/Login error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Same styles as Login
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "60px auto",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    title: {
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#4f46e5",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
    },
    buttonDisabled: {
      backgroundColor: "#a5b4fc",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? "Processing..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Registration;
