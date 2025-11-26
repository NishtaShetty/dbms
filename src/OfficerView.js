import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome Administrator!</h2>
          <p>You have full administrative access to all system features.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>👨‍💼 User Management</h3>
            <p>Manage all users and permissions</p>
          </div>
          <div className="feature-card">
            <h3>🚌 Fleet Management</h3>
            <p>Manage bus fleet and vehicles</p>
          </div>
          <div className="feature-card">
            <h3>📈 Analytics</h3>
            <p>View system analytics and reports</p>
          </div>
          <div className="feature-card">
            <h3>⚙️ System Settings</h3>
            <p>Configure system settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

