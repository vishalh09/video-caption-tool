import React, { useEffect, useRef } from 'react';

const getYouTubeEmbedUrl = (url) => {
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};

const VideoPlayer = ({ videoUrl, captions }) => {
  const videoRef = useRef(null);
  const captionRefs = useRef([]);
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      captions.forEach((caption, index) => {
        const captionElement = captionRefs.current[index];
        if (currentTime >= caption.startTime && currentTime <= caption.endTime) {
          captionElement.style.display = 'block';
        } else {
          captionElement.style.display = 'none';
        }
      });
    };

    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [captions]);

  return (
    <div className="relative aspect-w-16 aspect-h-9">
      {embedUrl ? (
        <iframe
          ref={videoRef}
          src={embedUrl}
          className="w-full h-full rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video controls className="w-full rounded-lg shadow-lg" ref={videoRef}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {captions.map((caption, index) => (
        <div
          key={index}
          ref={(el) => (captionRefs.current[index] = el)}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-75 px-4 py-2 rounded transition-opacity duration-300"
          style={{ display: 'none' }}
        >
          {caption.text}
        </div>
      ))}
    </div>
  );
};

export default VideoPlayer;
