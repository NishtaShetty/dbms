import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const OfficerView = () => {
  return (
    <Card sx={{ maxWidth: 700, margin: '40px auto' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          <VerifiedUserIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Officer Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Monitor bus occupancy, generate reports, and manage operations.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">View Occupancy</Button>
        <Button variant="outlined">Generate Reports</Button>
        <Button variant="outlined">Manage Fleet</Button>
      </CardActions>
    </Card>
  );
};

export default OfficerView;
