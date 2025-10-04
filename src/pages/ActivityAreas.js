import React from 'react';
import { Box } from '@mui/material';
import activities from '../data/activities';
import ActivityShowcase from '../components/activity/ActivityShowcase';

const ActivityAreas = () => {

  return (
     <Box sx={{ background: 'linear-gradient(135deg, #f8fbff 0%, #eef3f9 100%)' }}>
      <ActivityShowcase activities={activities} />
    </Box>
  );
};

export default ActivityAreas;