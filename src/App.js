import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages klasöründen import edin
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ActivityAreas from "./pages/ActivityAreas";
import Projects from "./pages/Projects";

function App() {
  const [settings, setSettings] = useState({
    title: "Sedat Demir Yapı",
    color: "#1976d2",
    logoUrl: "",
  });

  // localStorage kısmını kaldırdım (artifact ortamında sorun çıkarır)
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home settings={settings} />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/faaliyet-alanlari" element={<ActivityAreas />} />
        <Route path="/projeler" element={<Projects />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/admin" element={<Admin settings={settings} setSettings={setSettings} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;