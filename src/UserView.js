import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const UserView = () => {
  return (
    <Card sx={{ maxWidth: 700, margin: '40px auto' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          <PeopleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Passenger Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View bus schedules, purchase tickets, and track buses in real-time.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Buy Ticket</Button>
        <Button variant="outlined">Bus Schedules</Button>
        <Button variant="outlined">Track Bus</Button>
      </CardActions>
    </Card>
  );
};

export default UserView;
