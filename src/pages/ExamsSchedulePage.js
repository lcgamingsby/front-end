import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function ExamSchedulePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMonth, setFilterMonth] = useState("all");

  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", path: "/admin" },
    { name: "Exam Schedule", path: "/exam-schedule" },
    { name: "Questions", path: "/questions" },
    { name: "Student Accounts", path: "/student-accounts" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    // Simulasi fetch data dari backend
    const fetchData = async () => {
      const data = []; // kosong, tapi nanti otomatis muncul jika ada di database
      setExams(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let results = exams;

    if (filterMonth !== "all") {
      results = results.filter((exam) => exam.date.includes(filterMonth));
    }

    if (searchTerm) {
      results = results.filter((exam) =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExams(results);
    setCurrentPage(1);
  }, [exams, searchTerm, filterMonth]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExams = filteredExams.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);

  return (
    <>
      {/* === NAVBAR LANGSUNG DI SINI === */}
      <header className="admin-navbar">
        <div className="logo-section">
        <img src="/logoukdc.png" alt="Logo" className="dashboard-logo" />
          <h1>TEC UKDC</h1>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-link${currentPath === item.path ? " active" : ""}`}
              onClick={(e) => {
                if (currentPath === item.path) e.preventDefault();
              }}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* === ISI HALAMAN EXAM === */}
      <div className="admin-content">
        <div className="page-header">
          <h2>All Exams</h2>
          <button className="add-button" onClick={() => navigate("/add-exam")}>
            ➕ Add an Exam
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
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="all">All Months</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
          </select>

          <input
            type="text"
            className="search-box"
            placeholder="🔍 Search exams"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="exam-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Schedule</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentExams.length > 0 ? (
              currentExams.map((exam, index) => (
                <tr key={index}>
                  <td>{exam.id}</td>
                  <td>{exam.title}</td>
                  <td>{exam.date} ({exam.time})</td>
                  <td>{exam.students}</td>
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
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredExams.length)} of{" "}
          {filteredExams.length}
        </p>
      </div>
    </>
  );
}

export default ExamSchedulePage;
