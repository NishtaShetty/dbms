import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Login";
import TicketCollector from "./TicketCollector";
import OfficerDashboard from "./OfficerDashboard";
import UserDashboard from "./UserView";

// Role-based route wrapper
const RoleBasedRoute = ({ children, allowedRoles, userRole }) => {
  if (!userRole) {
    // Not logged in redirect to login
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    // Role not authorized, redirect to login
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={(role) => setUserRole(role)} />}
        />

        <Route
          path="/conductor"
          element={
            <RoleBasedRoute allowedRoles={["conductor"]} userRole={userRole}>
              <TicketCollector />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/officer"
          element={
            <RoleBasedRoute allowedRoles={["officer"]} userRole={userRole}>
              <OfficerDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <RoleBasedRoute allowedRoles={["user"]} userRole={userRole}>
              <UserDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
