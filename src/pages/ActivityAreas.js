import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import ActivityShowcase from '../components/activity/ActivityShowcase';

const ActivityAreas = ({ siteContent }) => {
  const activities = useMemo(
    () => (siteContent?.activities || []).filter((activity) => activity?.title),
    [siteContent]
  );

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f8fbff 0%, #eef3f9 100%)' }}>
      <ActivityShowcase activities={activities} />
    </Box>
  );
};

export default ActivityAreas;