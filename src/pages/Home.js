import React from 'react';
import VideoSlider from "../components/VideoSlider";
import AboutSection from "../components/AboutSection";
import ActivitiesSection from "../components/ActivitiesSection";
import CodeReviewSection from "../components/CodeReviewSection";
import { useSite } from "../context/SiteContext";

function Home() {
  const { siteContent, settings } = useSite();
  const videos = siteContent?.homepageVideos || [];
  const photos = siteContent?.galleryPhotos || [];
  const activities = siteContent?.activities || [];
  const about = siteContent?.config || {};
  const isCodeReviewEnabled = settings?.codeReviewEnabled;

  return (
    <>
      <VideoSlider videos={videos} />
      <AboutSection photos={photos} about={about} />
      <ActivitiesSection activities={activities} />
      {isCodeReviewEnabled && <CodeReviewSection />}
    </>
  );
}

export default Home;

