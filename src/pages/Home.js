import VideoSlider from '../components/VideoSlider';
import AboutSection from '../components/AboutSection';
import ActivitiesSection from '../components/ActivitiesSection';

function Home({ siteContent }) {
  const videos = siteContent?.homepageVideos || [];
  const photos = siteContent?.galleryPhotos || [];

  return (
    <div style={{ padding: "20px" }}>
      <VideoSlider videos={videos} />
      <AboutSection photos={photos} />
      <ActivitiesSection />
    </div>
  );
}

export default Home;
