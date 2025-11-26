import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Login";
import AdminDashboard from "./OfficerView";
import OfficerDashboard from "./OfficerDashboard";
import UserDashboard from "./UserView";
import Unauthorized from "./Unauthorized";

// Role-based route wrapper
const RoleBasedRoute = ({ children, allowedRoles, userRole }) => {
  if (!userRole) {
    // Not logged in redirect to login
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    // Role not authorized
    return <Navigate to="/unauthorized" replace />;
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
          path="/admin"
          element={
            <RoleBasedRoute allowedRoles={["admin"]} userRole={userRole}>
              <AdminDashboard />
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

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
