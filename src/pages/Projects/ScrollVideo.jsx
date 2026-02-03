import { useRef, useState, useEffect } from "react";

export default function ScrollVideo({ scrollProgress }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const rafIdRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.pause();
    }
  };

  const handleCanPlayThrough = () => {
    setIsReady(true);
  };

  // Sync video playback with scroll progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration || !isReady) return;

    const updateVideoFrame = () => {
      if (!video) {
        return;
      }

      const currentScroll = scrollProgress.get();
      
      const videoProgress = Math.min(1, Math.max(0, currentScroll / 0.75));
      const targetTime = videoProgress * duration;

      const now = performance.now();
      
      // Update every frame
      if (now - lastUpdateTimeRef.current > 14) {
        if (Math.abs(video.currentTime - targetTime) > 0.1) {
          try {
            video.currentTime = targetTime;
          } catch (e) {
            console.error("Video seek error:", e);
          }
        }
        lastUpdateTimeRef.current = now;
      }

      rafIdRef.current = requestAnimationFrame(updateVideoFrame);
    };

    // Start the update loop
    lastUpdateTimeRef.current = performance.now();
    updateVideoFrame();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [duration, isReady, scrollProgress]);

  return (
    <video
      ref={videoRef}
      src="/videos/Floating_Doorway_Into_Void.mp4"
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover scale-110"
      onLoadedMetadata={handleLoadedMetadata}
      onCanPlayThrough={handleCanPlayThrough}
      onLoadedData={handleCanPlayThrough}
    />
  );
}
