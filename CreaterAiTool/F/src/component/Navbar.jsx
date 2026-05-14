import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    color: isActive ? "#ffffff" : "#333",
    backgroundColor: isActive ? "#3498db" : "transparent",
    transition: "0.2s ease",
  });

  const handleLogout = () => {
    localStorage.removeItem("token"); // optional auth
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#f4f6f8",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left Links */}
      <div style={{ display: "flex", gap: "15px" }}>
        <NavLink to="/dash/home" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/dash/userdata" style={linkStyle}>
          Users
        </NavLink>
        {/* <NavLink to="/dash/products" style={linkStyle}>
          Products
        </NavLink> */}
        <NavLink to="/dash/about" style={linkStyle}>
          About
        </NavLink>
        <NavLink to="/dash/tool" style={linkStyle}>
          Tools
        </NavLink>
        {/* <NavLink to="/dash/ai" style={linkStyle}>
          AI
        </NavLink> */}
        <NavLink to="/dash/youtube" style={linkStyle}>
          YouTube
        </NavLink>
        <NavLink to="/dash/gemini" style={linkStyle}>
          Gemini
        </NavLink>
        {/* <NavLink to="/dash/analyticshub" style={linkStyle}>
          Analyticshub
        </NavLink> */}

        {/* <NavLink to="/dash/gmail" style={linkStyle}>
          Gmail
        </NavLink> */}
        <NavLink to="/dash/editor" style={linkStyle}>
          TextEditor
        </NavLink>

        {/* <NavLink to="/dash/chatgpt" style={linkStyle}>
          Chatgpt
        </NavLink> */}
        {/* 
        <NavLink to="/dash/voicecontrolledai" style={linkStyle}>
          VoiceControlledAI
        </NavLink> */}
      </div>

      {/* Right Section */}
      <button
        onClick={handleLogout}
        style={{
          padding: "6px 14px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
