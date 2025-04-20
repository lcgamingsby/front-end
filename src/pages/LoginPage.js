import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { students, admins } from "../data/users";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleLogin = () => {
    const userList = role === "admin" ? admins : students;
    const found = userList.find(user => user.name === name && user.password === password);

    if (found) {
      navigate(role === "admin" ? "/admin" : "/student");
    } else {
      alert("Akun belum terdaftar / tidak ada");
    }

    if (found) {
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      navigate(role === "admin" ? "/admin" : "/student");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Mahasiswa</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Kata Sandi"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Masuk</button>
    </div>
  );
}

export default LoginPage;
