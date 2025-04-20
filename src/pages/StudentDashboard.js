import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import headphoneIcon from "../assets/headphone.webp";
import "../App.css";

function StudentDashboard() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  const goToListening = () => {
    navigate("/listening");
  };

  return (
    <div className="dashboard-container">
      <h2>Selamat Datang, {userName} 👋</h2>
      <p>Ini daftar Test yang bisa kamu lakukan {userName}</p>

      <button className="dashboard-button" onClick={goToListening}>
        <img src={headphoneIcon} alt="Listening Icon" />
        Mulai Tes Listening
      </button>
    </div>
  );
}

export default StudentDashboard;
