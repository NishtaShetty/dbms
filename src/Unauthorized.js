import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="error-content">
        <div className="error-icon">⛔</div>
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to access this page.</p>
        <button className="logout-btn" onClick={() => navigate("/login")}>
          Return to Login
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;

