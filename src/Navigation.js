import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = ({ isAuthenticated }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        BMTC Bus System
      </Typography>
      {isAuthenticated ? (
        <>
          <Button component={RouterLink} to="/user" color="inherit">
            Passenger
          </Button>
          <Button component={RouterLink} to="/ticket-collector" color="inherit">
            Collector
          </Button>
          <Button component={RouterLink} to="/officer" color="inherit">
            Officer
          </Button>
        </>
      ) : (
        <Button component={RouterLink} to="/login" color="inherit">
          Login
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Navigation;
