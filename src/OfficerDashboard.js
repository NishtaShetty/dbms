import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function OfficerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Officer Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome Officer!</h2>
          <p>You have access to officer-level features and operations.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📋 Manage Routes</h3>
            <p>View and manage bus routes</p>
          </div>
          <div className="feature-card">
            <h3>👥 Driver Management</h3>
            <p>Manage driver assignments</p>
          </div>
          <div className="feature-card">
            <h3>📊 Reports</h3>
            <p>View operational reports</p>
          </div>
          <div className="feature-card">
            <h3>⏱️ Schedule</h3>
            <p>Manage bus schedules</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerDashboard;
