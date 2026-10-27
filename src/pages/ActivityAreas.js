import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import ActivityShowcase from '../components/activity/ActivityShowcase';

const ActivityAreas = ({ siteContent }) => {
  const activities = useMemo(
    () => (siteContent?.activities || []).filter((activity) => activity?.title),
    [siteContent]
  );

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <ActivityShowcase activities={activities} />
    </Box>
  );
};

export default ActivityAreas;