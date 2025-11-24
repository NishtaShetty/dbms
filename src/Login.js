// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roles = ['user', 'ticketCollector', 'officer'];

  const handleLogin = () => {
    if (!username || !role) {
      setError('Please enter username and select role');
      return;
    }
    setError('');
    // Pass logged-in info to parent
    onLogin({ username, role });
    // Redirect based on role
    switch (role) {
      case 'user':
        navigate('/user');
        break;
      case 'ticketCollector':
        navigate('/ticket-collector');
        break;
      case 'officer':
        navigate('/officer');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select
            labelId="role-label"
            label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && (
          <Typography color="error" mt={2} mb={1}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
