import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./TicketCollector.css";

// Mock data for routes and buses
const routesData = [
  {
    id: 1,
    name: "Whitefield - MG Road",
    stops: ["Whitefield", "Divyashree Towers", "Raheja Pinnacle", "Koramangala", "MG Road"],
    buses: ["101", "102", "103"],
  },
  {
    id: 2,
    name: "Indiranagar - Marathahalli",
    stops: ["Indiranagar", "Ulsoor", "Bangalore City", "Marathahalli"],
    buses: ["301", "302", "303"],
  },
  {
    id: 3,
    name: "Koramangala - Vidhana Soudha",
    stops: ["Koramangala", "Indiranagar", "Vidhana Soudha"],
    buses: ["201", "202", "203"],
  },
];

// Initialize passenger data
const initializePassengerData = (stops) => {
  return stops.map((stop) => ({
    name: stop,
    boarded: 0,
    departed: 0,
  }));
};

function TicketCollectorDashboard() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedBusNo, setSelectedBusNo] = useState("");
  const [selectedStop, setSelectedStop] = useState("");
  const [passengersData, setPassengersData] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(0);

  const handleLogout = () => {
    navigate("/login");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleRouteChange = (e) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId);
    setSelectedBusNo("");
    setSelectedStop("");
    setPassengersData([]);
    setTotalPassengers(0);

    if (routeId) {
      const route = routesData.find((r) => r.id === parseInt(routeId));
      const initialized = initializePassengerData(route.stops);
      setPassengersData(initialized);
      showNotification(`✓ Route ${route.name} selected`, "success");
    }
  };

  const handleBusChange = (e) => {
    const busNo = e.target.value;
    setSelectedBusNo(busNo);
    setSelectedStop("");
    if (busNo) {
      showNotification(`🚌 Bus #${busNo} selected`, "info");
    }
  };

  const handleStopChange = (e) => {
    const stopName = e.target.value;
    setSelectedStop(stopName);
    if (stopName) {
      showNotification(`📍 Stop ${stopName} selected`, "info");
    }
  };

  const handleBoardPassenger = () => {
    if (!selectedRoute || !selectedBusNo || !selectedStop) {
      showNotification("⚠️ Please select route, bus, and stop first", "warning");
      return;
    }

    const updatedData = passengersData.map((stop) =>
      stop.name === selectedStop ? { ...stop, boarded: stop.boarded + 1 } : stop
    );
    setPassengersData(updatedData);
    setTotalPassengers(totalPassengers + 1);
    showNotification(
      `✓ Passenger boarded at ${selectedStop} (Bus #${selectedBusNo})`,
      "success"
    );
  };

  const handleDepartPassenger = () => {
    if (!selectedRoute || !selectedBusNo || !selectedStop) {
      showNotification("⚠️ Please select route, bus, and stop first", "warning");
      return;
    }

    const currentStop = passengersData.find((s) => s.name === selectedStop);
    if (currentStop && currentStop.boarded - currentStop.departed <= 0) {
      showNotification("❌ No passengers to depart at this stop", "error");
      return;
    }

    const updatedData = passengersData.map((stop) =>
      stop.name === selectedStop ? { ...stop, departed: stop.departed + 1 } : stop
    );
    setPassengersData(updatedData);
    setTotalPassengers(Math.max(0, totalPassengers - 1));
    showNotification(
      `✓ Passenger departed at ${selectedStop} (Bus #${selectedBusNo})`,
      "success"
    );
  };

  const handleReset = () => {
    setSelectedRoute("");
    setSelectedBusNo("");
    setSelectedStop("");
    setPassengersData([]);
    setTotalPassengers(0);
    showNotification("🔄 Data reset successfully", "info");
  };

  const currentRoute = routesData.find((r) => r.id === parseInt(selectedRoute));
  const availableBuses = currentRoute ? currentRoute.buses : [];
  const availableStops = currentRoute ? currentRoute.stops : [];

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
        <h1>Ticket Collector Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome Ticket Collector!</h2>
          <p>Track and manage passenger boarding and departure records</p>
        </div>

        {/* Selection Section */}
        <div className="selection-section">
          <h3>Select Journey Details</h3>
          <div className="selection-container">
            <div className="select-group">
              <label htmlFor="route">Route:</label>
              <select
                id="route"
                value={selectedRoute}
                onChange={handleRouteChange}
                className="select-input"
              >
                <option value="">-- Select Route --</option>
                {routesData.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="bus">Bus Number:</label>
              <select
                id="bus"
                value={selectedBusNo}
                onChange={handleBusChange}
                className="select-input"
                disabled={!selectedRoute}
              >
                <option value="">-- Select Bus --</option>
                {availableBuses.map((bus) => (
                  <option key={bus} value={bus}>
                    Bus #{bus}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="stop">Stop:</label>
              <select
                id="stop"
                value={selectedStop}
                onChange={handleStopChange}
                className="select-input"
                disabled={!selectedBusNo}
              >
                <option value="">-- Select Stop --</option>
                {availableStops.map((stop) => (
                  <option key={stop} value={stop}>
                    {stop}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        {selectedBusNo && selectedStop && (
          <div className="action-section">
            <button className="action-btn board-btn" onClick={handleBoardPassenger}>
              ↓ Passenger Boarded
            </button>
            <button className="action-btn depart-btn" onClick={handleDepartPassenger}>
              ↑ Passenger Departed
            </button>
            <button className="action-btn reset-btn" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
        )}

        {/* Stats Section */}
        {selectedBusNo && passengersData.length > 0 && (
          <div className="stats-section">
            <div className="stat-card total">
              <h4>Total on Bus</h4>
              <div className="stat-value">{totalPassengers}</div>
            </div>
          </div>
        )}

        {/* Passenger Tracking Table */}
        {passengersData.length > 0 && (
          <div className="tracking-section">
            <h3>Passenger Tracking - Bus #{selectedBusNo} ({selectedRoute && currentRoute.name})</h3>
            <div className="table-container">
              <table className="tracking-table">
                <thead>
                  <tr>
                    <th>Stop Name</th>
                    <th>Boarded</th>
                    <th>Departed</th>
                    <th>Currently On Bus</th>
                  </tr>
                </thead>
                <tbody>
                  {passengersData.map((stop, index) => (
                    <tr key={index} className={stop.name === selectedStop ? "active-stop" : ""}>
                      <td className="stop-name">
                        {index + 1}. {stop.name}
                        {stop.name === selectedStop && <span className="current-badge">CURRENT</span>}
                      </td>
                      <td className="boarded-count">{stop.boarded}</td>
                      <td className="departed-count">{stop.departed}</td>
                      <td className="current-count">{Math.max(0, stop.boarded - stop.departed)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketCollectorDashboard;

