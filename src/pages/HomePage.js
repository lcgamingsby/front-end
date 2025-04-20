import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="app-bar">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="test-title">TEC Kampus</h1>
        </div>
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      <div className="home-content">
        <h2>Informasi Tes TEC Kampus</h2>
        <p>🗓 Jadwal: Setiap Senin & Kamis</p>
        <p>💰 Biaya: Rp 150.000</p>
        <p>👩‍🏫 Pengajar: Dosen Bahasa Inggris Berpengalaman</p>
        <p>📍 Lokasi: Ruang Lab Bahasa 2</p>
      </div>
    </div>
  );
}

export default HomePage;
