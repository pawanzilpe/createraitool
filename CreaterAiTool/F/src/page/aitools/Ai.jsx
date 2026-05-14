import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Ai() {
  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    backgroundColor: isActive ? "#007bff" : "#f0f0f0",
    color: isActive ? "#fff" : "#333",
    transition: "background-color 0.2s, transform 0.2s",
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>AI Dashboard</h2>

      <nav style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
        <NavLink to="image" style={navLinkStyle}>
          Image
        </NavLink>
        <NavLink to="mapp" style={navLinkStyle}>
          Mapp
        </NavLink>
      </nav>

      {/* This renders the selected child route */}
      <Outlet />
    </div>
  );
}

export default Ai;
