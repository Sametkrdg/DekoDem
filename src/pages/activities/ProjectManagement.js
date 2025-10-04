import React from 'react';
import activities from '../../data/activities';
import ActivityDetail from '../../components/activity/ActivityDetail';

const ProjectManagement = () => {
  const activity = activities.find((item) => item.slug === 'proje-yonetimi');
  return <ActivityDetail activity={activity} />;
};

export default ProjectManagement;