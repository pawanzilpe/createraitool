// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   // Dashboard cards array for dynamic rendering
//   const cards = [
//     {
//       title: "👤 Users",
//       description: "Add, edit and delete users",
//       path: "/dash/",
//     },
//     {
//       title: "📦 Products / AI Tools",
//       description: "Manage your products or AI tools",
//       path: "/dash/aidash",
//     },
//     {
//       title: "ℹ️ About",
//       description: "Learn more about this project",
//       path: "/dash/about",
//     },
//   ];

//   // Hover effect handler
//   const handleHover = (e, scale) => {
//     e.currentTarget.style.transform = `scale(${scale})`;
//     e.currentTarget.style.boxShadow =
//       scale > 1 ? "0 4px 12px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.1)";
//   };

//   return (
//     <>
//       <div style={styles.container}>
//         {/* ===== HERO ===== */}
//         <h1 style={styles.title}>Welcome 👋</h1>
//         <p style={styles.subtitle}>
//           Manage your Users and Products easily with this React CRUD App
//         </p>

//         {/* ===== DASHBOARD CARDS ===== */}
//         <div style={styles.grid}>
//           {cards.map((card, index) => (
//             <Link
//               key={index}
//               to={card.path}
//               style={styles.card}
//               onMouseEnter={(e) => handleHover(e, 1.05)}
//               onMouseLeave={(e) => handleHover(e, 1)}
//             >
//               <h3>{card.title}</h3>
//               <p>{card.description}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// /* ===== STYLES ===== */
// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "60px 20px",
//     fontFamily: "sans-serif",
//   },
//   title: { fontSize: "42px", marginBottom: "10px" },
//   subtitle: { color: "gray", marginBottom: "40px", fontSize: "18px" },
//   grid: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "25px",
//     flexWrap: "wrap",
//   },
//   card: {
//     display: "block",
//     width: "220px",
//     padding: "25px",
//     borderRadius: "12px",
//     background: "#f5f5f5",
//     textDecoration: "none",
//     color: "#000",
//     transition: "transform 0.2s, box-shadow 0.2s",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     cursor: "pointer",
//   },
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const tools = [
    // { title: "🎥 Video AI", path: "/dash/tool/video" },
    // { title: "📧 Email AI", path: "/dash/tool/email" },
    { title: "🖥️ Screen Recorder", path: "/dash/tool/screen" },
    { title: "🎙️ Voice Recorder", path: "/dash/tool/voice" },
    // { title: "📊 Excel AI", path: "/dash/tool/excel" },
    { title: "📝 Text Editor", path: "/dash/editor" },
    { title: "📺 YouTube Tools", path: "/dash/youtube" },
    // { title: "📍 Map Tools", path: "/dash/ai/map" },
  ];

  return (
    <div style={styles.container}>
      {/* ===== HERO SECTION ===== */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🚀 Smart Creator AI Tool</h1>
        <p style={styles.subtitle}>
          All-in-one AI platform for modern content creators. Create, edit,
          automate and manage everything in one place.
        </p>

        <Link to="/dash/tool/video" style={styles.cta}>
          Get Started →
        </Link>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <div style={styles.about}>
        <h2>✨ Why CreatorAI?</h2>
        <p>
          CreatorAI is designed to simplify your workflow by combining multiple
          AI tools into a single powerful platform. No more switching between
          apps — everything you need is right here.
        </p>
      </div>

      {/* ===== FEATURES GRID ===== */}
      <div style={styles.grid}>
        {tools.map((tool, index) => (
          <Link key={index} to={tool.path} style={styles.card}>
            {tool.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ===== STYLES ===== */
const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "40px 20px",
    textAlign: "center",
    background: "linear-gradient(to right, #eef2ff, #f8fafc)",
    minHeight: "100vh",
  },

  hero: {
    marginBottom: "50px",
  },

  title: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#555",
    maxWidth: "600px",
    margin: "0 auto 20px",
  },

  cta: {
    display: "inline-block",
    padding: "12px 25px",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  about: {
    maxWidth: "700px",
    margin: "40px auto",
    color: "#444",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    padding: "20px",
    width: "200px",
    background: "#fff",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#000",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
};

export default Home;
