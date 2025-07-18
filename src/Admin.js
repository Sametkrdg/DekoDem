import React, { useState, useEffect } from "react";

function Admin({ settings, setSettings }) {
  // Local state admin formu için
  const [title, setTitle] = useState(settings.title || "");
  const [color, setColor] = useState(settings.color || "#1976d2");
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");

  // Ayarları kaydetme fonksiyonu
  const saveSettings = () => {
    const newSettings = { title, color, logoUrl };
    setSettings(newSettings);
    localStorage.setItem("siteSettings", JSON.stringify(newSettings));
    alert("Ayarlar kaydedildi!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <div style={{ marginBottom: 10 }}>
        <label>Site Başlığı:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Temel Renk:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginLeft: 10, width: 60, height: 30, verticalAlign: "middle" }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Logo URL:</label>
        <input
          type="text"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          style={{ marginLeft: 10, width: 300 }}
        />
      </div>

      <button onClick={saveSettings}>Kaydet</button>
    </div>
  );
}

export default Admin;
