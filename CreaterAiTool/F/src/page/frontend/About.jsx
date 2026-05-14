import React, { useState, useEffect } from "react";

const About = () => {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const toggleTheme = () => setDark(!dark);

  return (
    <div style={dark ? styles.darkContainer : styles.lightContainer}>
      {/* ===== HEADER ===== */}
      <div style={styles.header}>
        <h1 style={styles.title}>🚀Smart Creator AI Tool</h1>
        <p style={styles.subtitle}>
          {user
            ? `Welcome back, ${user.name} 👋`
            : "Powerful AI tools for creators"}
        </p>

        <button onClick={toggleTheme} style={styles.toggle}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* ===== GRID ===== */}
      <div style={styles.grid}>
        {sections.map((sec, i) => (
          <div
            key={i}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3>{sec.title}</h3>
            <ul>
              {sec.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ===== FOOTER ===== */}
      <p style={styles.footer}>
        Built with ❤️ using React + AI — Smart Creator AI Tool © 2026
      </p>
    </div>
  );
};

/* ===== DATA ===== */
const sections = [
  {
    title: "🎯 Mission",
    items: [
      "Simplify content creation",
      "Reduce tool switching",
      "Boost productivity",
    ],
  },
  {
    title: "✨ Features",
    items: [
      "Video & Image AI",
      "Email Generator",
      "Screen & Voice Tools",
      "Text Editor",
    ],
  },
  {
    title: "🔥 Why Us",
    items: [
      "All-in-one platform",
      "Fast UI",
      "Beginner friendly",
      "AI powered",
    ],
  },
  {
    title: "⚙️ Tech",
    items: ["React", "Node", "MongoDB", "Gemini AI"],
  },
  {
    title: "🔮 Future",
    items: ["Resume Builder", "Mobile App", "Cloud Sync", "Collaboration"],
  },
];

/* ===== STYLES ===== */

const baseContainer = {
  minHeight: "100vh",
  padding: "40px 20px",
  fontFamily: "sans-serif",
  transition: "0.3s",
};

const styles = {
  darkContainer: {
    ...baseContainer,
    background: "linear-gradient(135deg, #ffffff, #ffffff)",
    color: "#000000",
  },

  lightContainer: {
    ...baseContainer,
    background: "linear-gradient(135deg, #000000, #000000)",
    color: "#f5f5f5",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.8,
  },

  toggle: {
    marginTop: "15px",
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
  },

  card: {
    width: "260px",
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    marginTop: "40px",
    opacity: 0.7,
  },
};

export default About;
