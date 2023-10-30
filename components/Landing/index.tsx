import Brand from '../Brand'
import VideoOverlay from '../VideoOverlay'

const src = {
  mp4: '/assets/video/v.mp4',
  mov: '/assets/video/v.mov',
  ogv: '/assets/video/v.ogv',
}

function Landing() {
  return (
    <div className="relative flex h-full items-center justify-center bg-black">
      <Brand
        src="/assets/logo.png"
        alt="toyz logo"
      />
      <VideoOverlay src={src} />
    </div>
  )
}

export default Landing
