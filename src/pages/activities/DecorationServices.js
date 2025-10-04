import React from 'react';
import activities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const DecorationServices = () => {
  const activity = activities.find((item) => item.slug === 'dekorasyon-hizmetleri');
  return <ActivityDetail activity={activity} />;
};

export default DecorationServices;