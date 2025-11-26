import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome User!</h2>
          <p>You have access to standard user features.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🎟️ Book Tickets</h3>
            <p>Book bus tickets online</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Track Bus</h3>
            <p>Track buses in real-time</p>
          </div>
          <div className="feature-card">
            <h3>📋 My Bookings</h3>
            <p>View your ticket history</p>
          </div>
          <div className="feature-card">
            <h3>💬 Support</h3>
            <p>Contact customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
