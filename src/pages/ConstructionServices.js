import React, { useMemo } from "react";
import defaultActivities from "../data/activities";
import ActivityDetail from "../components/activity/ActivityDetail";

const ConstructionServices = ({ siteContent }) => {
  const activities = siteContent?.activities?.length
    ? siteContent.activities
    : defaultActivities;

  const activity = useMemo(
    () => activities.find((item) => item.slug === "yapi-hizmetleri"),
    [activities]
  );

  return <ActivityDetail activity={activity} />;
};

export default ConstructionServices;