import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Define users with roles
const users = {
  conductor: { password: "conductor123", role: "conductor" },
  officer: { password: "officer123", role: "officer" },
  user: { password: "user123", role: "user" },
};

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (users[username] && users[username].password === password) {
      const role = users[username].role;
      onLogin(role);
      
      // Navigate based on role
      if (role === "conductor") {
        navigate("/conductor");
      } else if (role === "officer") {
        navigate("/officer");
      } else if (role === "user") {
        navigate("/user");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>BMTC</h1>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Log In</button>
        </form>

       

      </div>
    </div>
  );
}

export default LoginPage;
