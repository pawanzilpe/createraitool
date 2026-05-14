import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dash/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Internal CSS (JS object)
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
    error: {
      color: "#e63946",
      marginBottom: "10px",
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
    footer: {
      marginTop: "15px",
      fontSize: "14px",
    },
    link: {
      color: "#4f46e5",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={styles.footer}>
        Don't have an account?{" "}
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
