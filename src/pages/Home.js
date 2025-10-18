import VideoSlider from "../components/VideoSlider";
import AboutSection from "../components/AboutSection";
import ActivitiesSection from "../components/ActivitiesSection";
import CodeReviewSection from "../components/CodeReviewSection";

function Home({ siteContent, settings }) {
  const videos = siteContent?.homepageVideos || [];
  const photos = siteContent?.galleryPhotos || [];
  const isCodeReviewEnabled = settings?.codeReviewEnabled;

  return (
    <div style={{ padding: "20px" }}>
      <VideoSlider videos={videos} />
      <AboutSection photos={photos} />
      <ActivitiesSection />
      {isCodeReviewEnabled && <CodeReviewSection />}
    </div>
  );
}

export default Home;
