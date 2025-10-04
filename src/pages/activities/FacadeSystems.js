import React from 'react';
import activities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const FacadeSystems = () => {
  const activity = activities.find((item) => item.slug === 'cephe-giydirme');
  return <ActivityDetail activity={activity} />;
};

export default FacadeSystems;