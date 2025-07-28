import VideoSlider from '../components/VideoSlider';
import AboutSection from '../components/AboutSection';
import ActivitiesSection from '../components/ActivitiesSection';

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <VideoSlider />
      <AboutSection />
      <ActivitiesSection />
    </div>
  );
}

export default Home;
