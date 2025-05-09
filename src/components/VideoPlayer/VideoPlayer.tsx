import { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-seek-buttons"; // Import the seek buttons plugin
import "videojs-seek-buttons/dist/videojs-seek-buttons.css"; // Import the plugin CSS

const VideoPlayer = ({ title, src }: { title: string; src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  const [videoState, setVideoState] = useState({
    videoBuffering: false,
    videoInitialized: false,
    isPlaying: false,
    isErrorOccurred: false,
    seeking: false,
    muted: true,
    playedPercentage: 0,
    playedSeconds: 0,
    remainingVideoPlay: 0,
    loadedPercentage: 0,
    totalDuration: 0,
    playbackRate: 1.0,
    loop: false,
  });

  const videoJsOptions = {
    autoplay: false,
    muted: true,
    // height: 200,
    // width: 400,
    controls: true,
    sources: [
      {
        title: title,
        src: src,
        type: "video/mp4",
      },
    ],
  };

  // Extra controls below player
  const play = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const forwardVideo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() + 10);
    }
  };

  const backwardVideo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() - 10);
    }
  };

  const jumpTo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(55);
    }
  };

  const togglePlay = () => {
    if (videoState.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const secondsToHms = (secs: number) => {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = Math.floor(secs % 60);
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, videoJsOptions, () => {
        console.log("onPlayerReady");

        // Add seek buttons to control bar
        player.seekButtons({
          forward: 10,
          back: 10,
          // // forwardContent: '<span class="seek-label">+10s</span>',
          // // backContent: '<span class="seek-label">-10s</span>',
          // // forwardTip: "Skip forward 10 seconds",
          // // backTip: "Skip backward 10 seconds",
        });

        // Add download button to control bar
        const downloadButton = player.controlBar.addChild(
          "button"
        ) as videojs.Button;

        // Set button properties
        downloadButton.controlText("Download Video");
        downloadButton.addClass("vjs-download-button");

        // Create icon element
        const icon = videojs.dom.createEl("span", {
          className: "vjs-icon-download",
        });

        downloadButton.on("click", () => {
          const videoSrc = player.currentSrc();
          if (videoSrc) {
            const link = document.createElement("a");
            link.href = videoSrc;
            link.download = title || "video";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        });
        // Append icon to button using Video.js DOM methods
        downloadButton.el().appendChild(icon);

        player.on("play", () => {
          setVideoState((prev) => ({ ...prev, isPlaying: true }));
        });

        player.on("loadedmetadata", () => {
          setVideoState((prev) => ({
            ...prev,
            totalDuration: player.duration(),
          }));
        });

        player.on("pause", () => {
          setVideoState((prev) => ({ ...prev, isPlaying: false }));
        });

        player.on("ended", () => {
          console.log("ended");
        });

        player.on("timeupdate", () => {
          setVideoState((prev) => ({
            ...prev,
            playedSeconds: player.currentTime(),
            remainingVideoPlay: player.remainingTime(),
          }));
        });
      });

      playerRef.current = player;

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, []);

  const { totalDuration, playedSeconds, remainingVideoPlay, isPlaying } =
    videoState;

  return (
    <div className="customVideoPlayer">
      <video ref={videoRef} className="video-js" />

      <div className="extra-info">
        <div>Title: {title}</div>
        <div>Played Time: {secondsToHms(playedSeconds)}</div>
        <div>Total Time: {secondsToHms(totalDuration)}</div>
        <div>Remaining Time: {secondsToHms(remainingVideoPlay)}</div>
      </div>
      <div className="d-flex">
        <button className="btn btn-danger btn-sm" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        &nbsp;
        <button className="btn btn-danger btn-sm" onClick={jumpTo}>
          Play from 55th sec
        </button>
        &nbsp;
        <button className="btn btn-danger btn-sm" onClick={forwardVideo}>
          10s +
        </button>
        &nbsp;
        <button className="btn btn-danger btn-sm" onClick={backwardVideo}>
          10s -
        </button>
      </div>
    </div>
  );
};
export default VideoPlayer;
