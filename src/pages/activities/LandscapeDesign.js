import React, { useMemo } from 'react';
import defaultActivities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const LandscapeDesign = ({ siteContent }) => {
  const activities = siteContent?.activities?.length
    ? siteContent.activities
    : defaultActivities;

  const activity = useMemo(
    () => activities.find((item) => item.slug === 'peyzaj-duzenleme'),
    [activities]
  );
  return <ActivityDetail activity={activity} />;
};

export default LandscapeDesign;