interface VideoOverlayProps {
	src: string
}

function VideoOverlay({ src }: VideoOverlayProps) {
	return (
		<div className="h-screen bg-cover bg-center bg-no-repeat">
			<video
				className="absolute inset-0 z-0 h-screen w-screen object-cover"
				autoPlay
				loop
				muted
			>
				<source
					src={src}
					type="video/mp4"
				/>
			</video>
		</div>
	)
}

export default VideoOverlay
