import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Footer'ı ekle

// Yeni sayfa bileşenleri (örnek)
function Hakkimizda() {
  return <div style={{ padding: 20 }}><h2>Hakkımızda</h2><p>Firma hakkında bilgiler burada.</p></div>;
}
function FaaliyetAlanlari() {
  return <div style={{ padding: 20 }}><h2>Faaliyet Alanlarımız</h2><p>Faaliyet alanları burada.</p></div>;
}
function Projeler() {
  return <div style={{ padding: 20 }}><h2>Projeler</h2><p>Projelerimiz burada.</p></div>;
}
function Iletisim() {
  return <div style={{ padding: 20 }}><h2>İletişim</h2><p>İletişim bilgileri burada.</p></div>;
}

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home settings={settings} />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/faaliyet-alanlari" element={<FaaliyetAlanlari />} />
        <Route path="/projeler" element={<Projeler />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/admin" element={<Admin settings={settings} setSettings={setSettings} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;