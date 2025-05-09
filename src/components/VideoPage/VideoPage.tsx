import VideoPlayer from "../VideoPlayer/VideoPlayer";
import "./VideoPage.css";

const VideoPage = () => {
  const videoMockup = [
    {
      title: "big_buck_bunny",
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },

    {
      title: "elephant_dream",
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      title: "bigger_escapes",
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      title: "tears_of_steel",
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    },

    {
      title: "smoking_tire",
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    },
    {
      title: "chromecase_ads",
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    },
  ];

  return (
    <div className="video-container">
      {videoMockup.map((video, index) => (
        <VideoPlayer key={index} src={video.src} title={video.title} />
      ))}
    </div>
  );
};

export default VideoPage;
