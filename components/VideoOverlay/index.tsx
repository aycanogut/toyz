interface VideoOverlayProps {
  src: {
    mp4: string
    mov: string
    ogv: string
  }
}

function VideoOverlay({ src }: VideoOverlayProps) {
  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat">
      <video
        className="absolute inset-0 z-0 h-screen w-screen object-cover"
        autoPlay
        loop
        muted
        preload="auto"
      >
        <source
          src={src.mp4}
          type="video/mp4"
        />
        <source
          src={src.mov}
          type="video/mov"
        />
        <source
          src={src.ogv}
          type="video/ogv"
        />
      </video>
    </div>
  )
}

export default VideoOverlay
