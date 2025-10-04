import React from 'react';
import activities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const MaterialSales = () => {
  const activity = activities.find((item) => item.slug === 'malzeme-satisi');
  return <ActivityDetail activity={activity} />;
};

export default MaterialSales;