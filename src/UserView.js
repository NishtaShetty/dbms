import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./UserView.css";

// Mock data for buses and overcrowding
const busRoutes = {
  "Whitefield-MG Road": [
    { id: 1, busNumber: "101", overcrowdingIndex: 65, currentPassengers: 52, capacity: 80 },
    { id: 2, busNumber: "102", overcrowdingIndex: 82, currentPassengers: 66, capacity: 80 },
    { id: 3, busNumber: "103", overcrowdingIndex: 45, currentPassengers: 36, capacity: 80 },
  ],
  "Koramangala-Vidhana Soudha": [
    { id: 4, busNumber: "201", overcrowdingIndex: 58, currentPassengers: 46, capacity: 80 },
    { id: 5, busNumber: "202", overcrowdingIndex: 72, currentPassengers: 58, capacity: 80 },
    { id: 6, busNumber: "203", overcrowdingIndex: 38, currentPassengers: 30, capacity: 80 },
  ],
  "Indiranagar-Marathahalli": [
    { id: 7, busNumber: "301", overcrowdingIndex: 88, currentPassengers: 70, capacity: 80 },
    { id: 8, busNumber: "302", overcrowdingIndex: 55, currentPassengers: 44, capacity: 80 },
    { id: 9, busNumber: "303", overcrowdingIndex: 91, currentPassengers: 73, capacity: 80 },
  ],
};

// Mock stop data for each bus - ADD ALL BUS NUMBERS
const busStopData = {
  "101": [
    { stopName: "Whitefield", currentCrowding: 30, predictedCrowding: 35, time: "10:15 AM" },
    { stopName: "Divyashree Towers", currentCrowding: 65, predictedCrowding: 72, time: "10:25 AM" },
    { stopName: "Raheja Pinnacle", currentCrowding: 58, predictedCrowding: 68, time: "10:35 AM" },
    { stopName: "Koramangala", currentCrowding: 52, predictedCrowding: 55, time: "10:45 AM" },
    { stopName: "MG Road", currentCrowding: 40, predictedCrowding: 42, time: "10:55 AM" },
  ],
  "102": [
    { stopName: "Whitefield", currentCrowding: 45, predictedCrowding: 50, time: "10:20 AM" },
    { stopName: "Divyashree Towers", currentCrowding: 82, predictedCrowding: 85, time: "10:30 AM" },
    { stopName: "Raheja Pinnacle", currentCrowding: 75, predictedCrowding: 78, time: "10:40 AM" },
    { stopName: "Koramangala", currentCrowding: 66, predictedCrowding: 70, time: "10:50 AM" },
    { stopName: "MG Road", currentCrowding: 55, predictedCrowding: 58, time: "11:00 AM" },
  ],
  "103": [
    { stopName: "Whitefield", currentCrowding: 25, predictedCrowding: 30, time: "10:10 AM" },
    { stopName: "Divyashree Towers", currentCrowding: 40, predictedCrowding: 45, time: "10:20 AM" },
    { stopName: "Raheja Pinnacle", currentCrowding: 35, predictedCrowding: 42, time: "10:30 AM" },
    { stopName: "Koramangala", currentCrowding: 30, predictedCrowding: 35, time: "10:40 AM" },
    { stopName: "MG Road", currentCrowding: 28, predictedCrowding: 32, time: "10:50 AM" },
  ],
  "201": [
    { stopName: "Koramangala", currentCrowding: 35, predictedCrowding: 40, time: "11:00 AM" },
    { stopName: "Indiranagar", currentCrowding: 50, predictedCrowding: 58, time: "11:15 AM" },
    { stopName: "Vidhana Soudha", currentCrowding: 45, predictedCrowding: 52, time: "11:30 AM" },
  ],
  "202": [
    { stopName: "Koramangala", currentCrowding: 60, predictedCrowding: 65, time: "11:05 AM" },
    { stopName: "Indiranagar", currentCrowding: 70, predictedCrowding: 75, time: "11:20 AM" },
    { stopName: "Vidhana Soudha", currentCrowding: 72, predictedCrowding: 78, time: "11:35 AM" },
  ],
  "203": [
    { stopName: "Koramangala", currentCrowding: 20, predictedCrowding: 25, time: "11:10 AM" },
    { stopName: "Indiranagar", currentCrowding: 35, predictedCrowding: 42, time: "11:25 AM" },
    { stopName: "Vidhana Soudha", currentCrowding: 38, predictedCrowding: 45, time: "11:40 AM" },
  ],
  "301": [
    { stopName: "Indiranagar", currentCrowding: 70, predictedCrowding: 80, time: "11:30 AM" },
    { stopName: "Ulsoor", currentCrowding: 85, predictedCrowding: 90, time: "11:45 AM" },
    { stopName: "Marathahalli", currentCrowding: 88, predictedCrowding: 92, time: "12:00 PM" },
  ],
  "302": [
    { stopName: "Indiranagar", currentCrowding: 40, predictedCrowding: 48, time: "11:35 AM" },
    { stopName: "Ulsoor", currentCrowding: 55, predictedCrowding: 62, time: "11:50 AM" },
    { stopName: "Marathahalli", currentCrowding: 55, predictedCrowding: 60, time: "12:05 PM" },
  ],
  "303": [
    { stopName: "Indiranagar", currentCrowding: 72, predictedCrowding: 82, time: "11:40 AM" },
    { stopName: "Ulsoor", currentCrowding: 88, predictedCrowding: 92, time: "11:55 AM" },
    { stopName: "Marathahalli", currentCrowding: 91, predictedCrowding: 95, time: "12:10 PM" },
  ],
};

function UserDashboard() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBusDetails, setShowBusDetails] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLogout = () => {
    navigate("/login");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSearch = () => {
    if (!source || !destination) {
      showNotification("⚠️ Please select both source and destination", "warning");
      return;
    }
    setSelectedBus(null);
    setShowBusDetails(false);
    showNotification(`🔍 Searching buses from ${source} to ${destination}...`, "info");
  };

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
    setShowBusDetails(true);
    showNotification(`🚌 Viewing details for Bus #${bus.busNumber}`, "info");
  };

  const getCrowdingColor = (index) => {
    if (index < 40) return "#4CAF50"; // Green
    if (index < 70) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  const getCrowdingLevel = (index) => {
    if (index < 40) return "Low";
    if (index < 70) return "Medium";
    return "High";
  };

  const routeKey = source && destination ? `${source}-${destination}` : null;
  const busesOnRoute = routeKey && busRoutes[routeKey] ? busRoutes[routeKey] : [];

  // Get stop data safely with fallback
  const getStopsForBus = (busNumber) => {
    return busStopData[busNumber] || [];
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
        <h1>User Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome User!</h2>
          <p>Check bus routes and overcrowding information</p>
        </div>

        {/* Source & Destination Selection */}
        <div className="search-section">
          <h3>Plan Your Journey</h3>
          <div className="search-container">
            <div className="select-group">
              <label htmlFor="source">Source:</label>
              <select
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="select-input"
              >
                <option value="">Select Source</option>
                <option value="Whitefield">Whitefield</option>
                <option value="Koramangala">Koramangala</option>
                <option value="Indiranagar">Indiranagar</option>
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="destination">Destination:</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="select-input"
              >
                <option value="">Select Destination</option>
                <option value="MG Road">MG Road</option>
                <option value="Vidhana Soudha">Vidhana Soudha</option>
                <option value="Marathahalli">Marathahalli</option>
              </select>
            </div>

            <button onClick={handleSearch} className="search-btn">
              Search Buses
            </button>
          </div>
        </div>

        {/* Bus Results */}
        {source && destination && (
          <div className="results-section">
            <h3>Available Buses: {source} → {destination}</h3>
            {busesOnRoute && busesOnRoute.length > 0 ? (
              <div className="buses-grid">
                {busesOnRoute.map((bus) => (
                  <div
                    key={bus.id}
                    className="bus-card"
                    onClick={() => handleBusClick(bus)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bus-header">
                      <h4>Bus #{bus.busNumber}</h4>
                    </div>
                    <div className="bus-info">
                      <div className="crowding-indicator">
                        <div
                          className="crowding-bar"
                          style={{
                            width: `${bus.overcrowdingIndex}%`,
                            backgroundColor: getCrowdingColor(bus.overcrowdingIndex),
                          }}
                        ></div>
                      </div>
                      <p className="crowding-text">
                        Crowding: <strong>{bus.overcrowdingIndex}%</strong>
                      </p>
                      <p className="crowding-level">
                        Level: <strong style={{ color: getCrowdingColor(bus.overcrowdingIndex) }}>
                          {getCrowdingLevel(bus.overcrowdingIndex)}
                        </strong>
                      </p>
                      <p className="passengers">
                        {bus.currentPassengers}/{bus.capacity} Passengers
                      </p>
                      <p className="click-hint">Click for details →</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">No buses available for this route</p>
            )}
          </div>
        )}

        {/* Bus Details - Stops with Current & Predicted Crowding */}
        {showBusDetails && selectedBus && (
          <div className="details-section">
            <button className="close-btn" onClick={() => { setShowBusDetails(false); showNotification("✓ Closed bus details", "success"); }}>✕ Close</button>
            <h3>Bus #{selectedBus.busNumber} - Route Details</h3>
            <div className="stops-container">
              {getStopsForBus(selectedBus.busNumber).length > 0 ? (
                <table className="stops-table">
                  <thead>
                    <tr>
                      <th>Stop Name</th>
                      <th>Current Crowding</th>
                      <th>Predicted Crowding</th>
                      <th>Estimated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getStopsForBus(selectedBus.busNumber).map((stop, index) => (
                      <tr key={index} className="stop-row">
                        <td className="stop-name">{stop.stopName}</td>
                        <td>
                          <div className="crowding-cell">
                            <span className="crowding-badge current">
                              {stop.currentCrowding}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="crowding-cell">
                            <span className="crowding-badge predicted">
                              {stop.predictedCrowding}%
                            </span>
                          </div>
                        </td>
                        <td className="time">{stop.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-results">No stop information available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;