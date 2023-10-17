import Brand from '@/components/Brand'
import VideoOverlay from '@/components/VideoOverlay'

const src = {
	mp4: '/assets/video/v.mp4',
	mov: '/assets/video/v.mov',
	ogv: '/assets/video/v.ogv',
}

export default function Home() {
	return (
		<main className="relative flex h-screen items-center justify-center bg-black">
			<Brand
				src="/assets/logo.png"
				alt="toyz logo"
			/>
			<VideoOverlay src={src} />
		</main>
	)
}
