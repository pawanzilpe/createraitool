import { Routes, Route } from "react-router-dom";

import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Userdata from "./Userdata";

function DashF() {
  return (
    <div>
      <About />
      <Home />
      <Products />
      <Userdata />
      <h2 style={{ textAlign: "center" }}>DashF Dashboard</h2>
    </div>
  );
}

export default DashF;
