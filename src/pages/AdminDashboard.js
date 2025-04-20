import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [testResults, setTestResults] = useState([]);

  const handleAddStudent = () => {
    alert(`Mahasiswa baru ditambahkan:\nNama: ${name}\nPassword: ${password}`);
    // Di versi backend, data ini akan dikirim ke database
    setName("");
    setPassword("");
  };

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("testResult"));
    if (results) {
      setTestResults([results]); // jika banyak data, bisa ditambahkan ke array
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Nama Mahasiswa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAddStudent}>Tambah Mahasiswa</button>

      <div>
        {testResults.length > 0 ? (
          testResults.map((result, idx) => (
            <div key={idx}>
              <h3>Hasil Tes untuk {result.username}</h3>
              <p>Nilai: {result.score}</p>
              <ul>
                {result.userAnswers.map((answer, i) => (
                  <li key={i}>Soal {answer.question}: Pilihan kamu - Option {String.fromCharCode(65 + answer.selected)}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil tes untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
