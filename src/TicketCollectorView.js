import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const TicketCollectorView = () => {
  return (
    <Card sx={{ maxWidth: 700, margin: '40px auto' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          <AssignmentIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Ticket Collector Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage ticket scanning, validation, and issue passenger reports.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Scan Ticket</Button>
        <Button variant="outlined">View Today's Reports</Button>
      </CardActions>
    </Card>
  );
};

export default TicketCollectorView;
