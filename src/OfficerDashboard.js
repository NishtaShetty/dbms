import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./OfficerDashboard.css";

// Mock data for top overcrowded buses
const busesData = [
  {
    id: 1,
    busNumber: "101",
    route: "Whitefield - MG Road",
    overcrowdingIndex: 85,
    currentPassengers: 68,
    capacity: 80,
    status: "Active",
    stops: [
      { name: "Whitefield", crowding: 30, time: "10:00 AM", passengers: 24 },
      { name: "Divyashree Towers", crowding: 65, time: "10:10 AM", passengers: 52 },
      { name: "Raheja Pinnacle", crowding: 85, time: "10:20 AM", passengers: 68 },
      { name: "Koramangala", crowding: 75, time: "10:30 AM", passengers: 60 },
      { name: "MG Road", crowding: 55, time: "10:40 AM", passengers: 44 },
    ],
  },
  {
    id: 2,
    busNumber: "303",
    route: "Indiranagar - Marathahalli",
    overcrowdingIndex: 82,
    currentPassengers: 65,
    capacity: 80,
    status: "Active",
    stops: [
      { name: "Indiranagar", crowding: 72, time: "11:00 AM", passengers: 58 },
      { name: "Ulsoor", crowding: 88, time: "11:15 AM", passengers: 70 },
      { name: "Bangalore City", crowding: 82, time: "11:30 AM", passengers: 65 },
      { name: "Marathahalli", crowding: 65, time: "11:45 AM", passengers: 52 },
    ],
  },
  {
    id: 3,
    busNumber: "202",
    route: "Koramangala - Vidhana Soudha",
    overcrowdingIndex: 78,
    currentPassengers: 62,
    capacity: 80,
    status: "Active",
    stops: [
      { name: "Koramangala", crowding: 45, time: "12:00 PM", passengers: 36 },
      { name: "Indiranagar", crowding: 68, time: "12:15 PM", passengers: 54 },
      { name: "Vidhana Soudha", crowding: 78, time: "12:30 PM", passengers: 62 },
    ],
  },
  {
    id: 4,
    busNumber: "205",
    route: "Jayanagar - Airport",
    overcrowdingIndex: 72,
    currentPassengers: 58,
    capacity: 80,
    status: "Active",
    stops: [
      { name: "Jayanagar", crowding: 50, time: "1:00 PM", passengers: 40 },
      { name: "Banashankari", crowding: 72, time: "1:20 PM", passengers: 58 },
      { name: "Frazer Town", crowding: 65, time: "1:40 PM", passengers: 52 },
      { name: "Airport", crowding: 45, time: "2:00 PM", passengers: 36 },
    ],
  },
  {
    id: 5,
    busNumber: "156",
    route: "Electronic City - Silk Board",
    overcrowdingIndex: 68,
    currentPassengers: 54,
    capacity: 80,
    status: "Active",
    stops: [
      { name: "Electronic City", crowding: 52, time: "2:30 PM", passengers: 42 },
      { name: "ITPL", crowding: 68, time: "2:50 PM", passengers: 54 },
      { name: "Silk Board", crowding: 60, time: "3:10 PM", passengers: 48 },
    ],
  },
];

function OfficerDashboard() {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleLogout = () => {
    navigate("/login");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleBusDetailsClick = (bus) => {
    setSelectedBus(bus);
    showNotification(`📍Scroll down to see details for Bus #${bus.busNumber} - ${bus.route}`, "info");
  };

  const handleCloseDetails = () => {
    showNotification(`✓ Closed details for Bus #${selectedBus.busNumber}`, "success");
    setSelectedBus(null);
  };

  const getCrowdingColor = (index) => {
    if (index < 40) return "#4CAF50";
    if (index < 70) return "#FFC107";
    return "#F44336";
  };

  const getRecommendations = (bus) => {
    const recommendations = [];

    if (bus.overcrowdingIndex > 80) {
      recommendations.push("🚨 Critical: Bus is severely overcrowded - dispatch backup immediately");
    }
    if (bus.currentPassengers === bus.capacity) {
      recommendations.push("⛔ Bus at full capacity - no more passengers should board");
    }
    
    const maxCrowding = Math.max(...bus.stops.map(s => s.crowding));
    const maxStop = bus.stops.find(s => s.crowding === maxCrowding);
    if (maxCrowding > 80) {
      recommendations.push("⏸️ Bottleneck at " + maxStop.name + ": Consider extended halt");
    }

    if (bus.overcrowdingIndex > 75) {
      recommendations.push("Monitor passenger load - consider route diversion");
    }

    recommendations.push("✓ Regular maintenance check recommended");
    
    return recommendations;
  };

  return (
    <div className="dashboard-container">
      {/* Notification Toast */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
          </div>
          <div className="notification-progress"></div>
        </div>
      )}

      <div className="dashboard-header">
        <h1>Officer Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome Officer!</h2>
          <p>Monitor top overcrowded buses and manage operations effectively.</p>
        </div>

        {/* Top 5 Overcrowded Buses Section */}
        <div className="buses-section">
          <h3>Top 5 Overcrowded Buses</h3>
          <div className="buses-grid">
            {busesData.map((bus) => (
              <div
                key={bus.id}
                className="bus-card"
                onClick={() => handleBusDetailsClick(bus)}
                style={{ cursor: "pointer" }}
              >
                <div className="bus-header">
                  <h4>Bus #{bus.busNumber}</h4>
                  <div className="crowding-badge" style={{ backgroundColor: getCrowdingColor(bus.overcrowdingIndex) }}>
                    {bus.overcrowdingIndex}%
                  </div>
                </div>
                <div className="bus-route">
                  <p className="route-name">{bus.route}</p>
                </div>
                <div className="bus-stats">
                  <div className="stat">
                    <span className="stat-label">Passengers:</span>
                    <span className="stat-value">{bus.currentPassengers}/{bus.capacity}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Status:</span>
                    <span className="stat-value status-active">{bus.status}</span>
                  </div>
                </div>
                <div className="crowding-bar">
                  <div
                    className="crowding-fill"
                    style={{
                      width: bus.overcrowdingIndex + "%",
                      backgroundColor: getCrowdingColor(bus.overcrowdingIndex),
                    }}
                  ></div>
                </div>
                <p className="click-hint">Click to view details →</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bus Details Timeline */}
        {selectedBus && (
          <div className="timeline-section">
            <button className="close-btn" onClick={handleCloseDetails}>✕ Close</button>
            <h3>Bus #{selectedBus.busNumber} - Route Timeline</h3>
            <div className="bus-info-banner">
              <div className="info-item">
                <span className="info-label">Route:</span>
                <span className="info-value">{selectedBus.route}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Passengers:</span>
                <span className="info-value">{selectedBus.currentPassengers}/{selectedBus.capacity}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className="info-value" style={{ color: "#4CAF50" }}>{selectedBus.status}</span>
              </div>
            </div>

            <div className="timeline-container">
              <div className="timeline">
                {selectedBus.stops.map((stop, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div
                        className="marker-circle"
                        style={{ backgroundColor: getCrowdingColor(stop.crowding) }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div className="timeline-content">
                      <h4>{stop.name}</h4>
                      <div className="stop-details">
                        <div className="detail-item">
                          <span className="label">Crowding:</span>
                          <span
                            className="value"
                            style={{ color: getCrowdingColor(stop.crowding) }}
                          >
                            {stop.crowding}%
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Passengers:</span>
                          <span className="value">{stop.passengers}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Time:</span>
                          <span className="value">{stop.time}</span>
                        </div>
                      </div>
                      <div className="crowding-bar-small">
                        <div
                          className="crowding-fill"
                          style={{
                            width: stop.crowding + "%",
                            backgroundColor: getCrowdingColor(stop.crowding),
                          }}
                        ></div>
                      </div>
                    </div>
                    {index < selectedBus.stops.length - 1 && <div className="timeline-line"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Box */}
            <div className="recommendations-box">
              <h4>Action Items & Recommendations</h4>
              <ul className="recommendations-list">
                {getRecommendations(selectedBus).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}

export default OfficerDashboard;
