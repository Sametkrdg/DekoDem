import React from "react";
import activities from "../data/activities";
import ActivityDetail from "../components/activity/ActivityDetail";

const ConstructionServices = () => {
  const activity = activities.find((item) => item.slug === "yapi-hizmetleri");
  return <ActivityDetail activity={activity} />;
};

export default ConstructionServices;