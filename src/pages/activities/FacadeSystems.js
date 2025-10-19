import React, { useMemo } from 'react';
import defaultActivities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const FacadeSystems = ({ siteContent }) => {
  const activities = siteContent?.activities?.length
    ? siteContent.activities
    : defaultActivities;

  const activity = useMemo(
    () => activities.find((item) => item.slug === 'cephe-giydirme'),
    [activities]
  );

  return <ActivityDetail activity={activity} />;
};

export default FacadeSystems;