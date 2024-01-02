function VideoOverlay() {
  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat">
      <video
        className="inset-0 z-0 h-screen w-screen object-cover"
        autoPlay
        loop
        muted
        preload="auto"
      >
        <source
          src="/assets/video/v.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/video/v.mov"
          type="video/mov"
        />
        <source
          src="/assets/video/v.ogv"
          type="video/ogv"
        />
      </video>
    </div>
  );
}

export default VideoOverlay;
