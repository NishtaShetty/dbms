// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation'; // Move Navigation to separate file or inline below
import Login from './Login';
import TicketCollectorView from './TicketCollectorView';
import UserView from './UserView';
import OfficerView from './OfficerView';

// PrivateRoute component for role-based access
const PrivateRoute = ({ children, isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" />;
  return children;
};

function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, userRole: null });

  const handleLogin = ({ username, role }) => {
    // Here you can add real authentication logic.
    // For demo, just set auth state.
    setAuth({ isAuthenticated: true, userRole: role });
  };

  return (
    <Router>
      <Navigation isAuthenticated={auth.isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Navigate to={`/${auth.userRole}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/user"
          element={
            <PrivateRoute
              isAuthenticated={auth.isAuthenticated}
              allowedRoles={['user']}
              userRole={auth.userRole}
            >
              <UserView />
            </PrivateRoute>
          }
        />
        <Route
          path="/ticket-collector"
          element={
            <PrivateRoute
              isAuthenticated={auth.isAuthenticated}
              allowedRoles={['ticketCollector']}
              userRole={auth.userRole}
            >
              <TicketCollectorView />
            </PrivateRoute>
          }
        />
        <Route
          path="/officer"
          element={
            <PrivateRoute
              isAuthenticated={auth.isAuthenticated}
              allowedRoles={['officer']}
              userRole={auth.userRole}
            >
              <OfficerView />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

