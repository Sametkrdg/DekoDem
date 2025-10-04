import React from 'react';
import activities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const LandscapeDesign = () => {
  const activity = activities.find((item) => item.slug === 'peyzaj-duzenleme');
  return <ActivityDetail activity={activity} />;
};

export default LandscapeDesign;