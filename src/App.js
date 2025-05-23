import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Test1 from "./pages/test"
import ExamSchedulePage from "./pages/ExamsSchedulePage";
import QuestionsPage from "./pages/QuestionPage";
//import StudentAccountsPage from "./pages/StudentsPage";

//<Route path="/student-accounts" element={<StudentAccountsPage/>} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/test1" element={<Test1/>} />
        <Route path="/exam-schedule" element={<ExamSchedulePage/>} />
        <Route path="/questions" element={<QuestionsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
