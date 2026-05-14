import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./page/authentication/Login.jsx";
import Registration from "./page/authentication/Registration.jsx";
import Home from "./page/frontend/Home.jsx";
import About from "./page/frontend/About.jsx";
import Userdata from "./page/frontend/Userdata.jsx";
import Products from "./page/frontend/Products.jsx";
import Tool from "./page/aitools/Aidash.jsx";
import Ai from "./page/aitools/Ai.jsx";
import Navbar from "./component/Navbar.jsx";
import Youtube from "./page/aitools/Youtube.jsx";
import Gemini from "./page/aitools/Gemini.jsx";
import Gmail from "./page/aitools/Gmail.jsx";
// import Analyticshub from "./page/aitools/Analyticshub.jsx";
import TextEditor from "./page/aitools/RichTextEditor.jsx";
import Mapp from "./page/aitools/mapp.jsx";
import VoiceControlledAI from "./page/aitools/VoiceControlledAI.jsx";

import VideoAi from "./page/aitools/VideoAi.jsx";
import EmailAi from "./page/aitools/EmailAi.jsx";
import ImgAi from "./page/aitools/ImgAi.jsx";
import ScreenRecorderAI from "./page/aitools/ScreenRecorderAI.jsx";
import VoiceRecorderAi from "./page/aitools/VoiceRecorderAi.jsx";
import ExcelAi from "./page/aitools/ExcelAi.jsx";

export function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Dashboard */}
      <Route path="/dash" element={<DashboardLayout />}>
        <Route index element={<Navigate to="home" replace />} />

        <Route path="home" element={<Home />} />
        <Route path="userdata" element={<Userdata />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="youtube" element={<Youtube />} />
        <Route path="editor" element={<TextEditor />} />
        <Route path="gemini" element={<Gemini />} />
        <Route path="gmail" element={<Gmail />} />
        {/* <Route path="analyticshub" element={<Analyticshub />} /> */}
        <Route path="" element={<VoiceControlledAI />} />
        {/* <Route path="chatgpt" element={<Chatgpt />} /> */}

        <Route path="tool" element={<Tool />}>
          <Route index element={<Navigate to="screen" replace />} />
          <Route path="video" element={<VideoAi />} />
          <Route path="email" element={<EmailAi />} />
          <Route path="screen" element={<ScreenRecorderAI />} />
          <Route path="voice" element={<VoiceRecorderAi />} />
          <Route path="excel" element={<ExcelAi />} />
          <Route path="editor" element={<TextEditor />} />
        </Route>

        <Route path="ai" element={<Ai />}>
          <Route index element={<Navigate to="video" replace />} />
          <Route path="image" element={<ImgAi />} />
          <Route path="mapp" element={<Mapp />} />
        </Route>
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
