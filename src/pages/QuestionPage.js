import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../questionpage.css";

function QuestionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Simulasi fetch
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          type: "Grammar",
          question: "Lorem ipsum dolor sit amet consectetur. Est nunc ante mattis...",
          choices: ["lorem", "ipsum", "dolor", "sit"],
        },
        {
          id: 2,
          type: "Reading",
          question: "Lorem ipsum dolor sit amet consectetur. Nisl ut amet id viverra...",
          choices: ["lorem", "ipsum", "dolor", "sit"],
        },
        {
          id: 3,
          type: "Listening",
          question: "Lorem ipsum dolor sit amet consectetur?",
          choices: ["lorem", "ipsum", "dolor", "sit"],
        },
      ];
      setQuestions(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = questions;

    if (filterType !== "all") {
      result = result.filter((q) => q.type === filterType);
    }

    if (searchTerm) {
      result = result.filter((q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(result);
    setCurrentPage(1);
  }, [questions, filterType, searchTerm]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <header className="admin-navbar">
        <div className="logo-section">
          <img src="/logoukdc.png" alt="Logo" className="logo" />
          <h1>TEC UKDC</h1>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-btn ${currentPath === "/admin" ? "active" : ""}`}
            disabled={currentPath === "/admin"}
            onClick={() => navigate("/admin")}
          >
            Home
          </button>
          <button
            className={`nav-btn ${currentPath === "/exam-schedule" ? "active" : ""}`}
            disabled={currentPath === "/exam-schedule"}
            onClick={() => navigate("/exam-schedule")}
          >
            Exams
          </button>
          <button
            className={`nav-btn ${currentPath === "/questions" ? "active" : ""}`}
            disabled={currentPath === "/questions"}
            onClick={() => navigate("/questions")}
          >
            Questions
          </button>
          <button
            className={`nav-btn ${currentPath === "/student-accounts" ? "active" : ""}`}
            disabled={currentPath === "/student-accounts"}
            onClick={() => navigate("/student-accounts")}
          >
            Students Accounts
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Konten */}
      <div className="admin-content">
        <div className="page-header">
          <h2>All Questions</h2>
          <button className="add-button" onClick={() => navigate("/add-question")}>
            ➕ Add a Question
          </button>
        </div>

        <div className="filter-bar">
          <label>
            Show{" "}
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[10, 20, 30, 50].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>{" "}
            items
          </label>

          <select
            className="filter-dropdown"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Grammar">Grammar</option>
            <option value="Reading">Reading</option>
            <option value="Listening">Listening</option>
          </select>

          <input
            type="text"
            className="search-box"
            placeholder="🔍 Search questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="exam-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Question</th>
              <th>Answer Choices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((q) => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.type}</td>
                  <td>{q.question}</td>
                  <td>{q.choices.join(", ")}</td>
                  <td>
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`page-btn ${num === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <p>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredQuestions.length)} of{" "}
          {filteredQuestions.length}
        </p>
      </div>
    </>
  );
}

export default QuestionsPage;
