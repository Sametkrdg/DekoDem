import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home({ settings }) {
  return (
    <div style={{ padding: 20, color: settings.color }}>
      <img
        src={settings.logoUrl}
        alt="Logo"
        style={{ maxWidth: 200, marginBottom: 20 }}
      />
      <h1>{settings.title || "Sedat Demir Yapı"}</h1>
      <p>Bu, inşaat firmamızın tanıtım sitesidir.</p>
    </div>
  );
}

function App() {
  const [settings, setSettings] = useState({
    title: "Sedat Demir Yapı",
    color: "#1976d2",
    logoUrl: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("siteSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  return (
    <Router>
      <nav style={{ padding: 10, backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: 10 }}>
          Anasayfa
        </Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home settings={settings} />} />
        <Route path="/admin" element={<Admin settings={settings} setSettings={setSettings} />} />
      </Routes>
    </Router>
  );
}

export default App;
