import React from "react";
import UserDetails from "./page/dashbord/UserDetails.jsx";
import ImprovementD from "./page/dashbord/ImprovementD.jsx";
import HomeD from "./HomeD.jsx";

function Dashdash() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard Overview</h2>
      <HomeD />
      <ImprovementD />
      <UserDetails />
    </div>
  );
}

export default Dashdash;
