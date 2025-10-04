import React from 'react';
import activities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const InteriorDesign = () => {
  const activity = activities.find((item) => item.slug === 'ic-mekan-tasarimi');
  return <ActivityDetail activity={activity} />;
};

export default InteriorDesign;