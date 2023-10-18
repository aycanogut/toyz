import Image from 'next/image'

import { BrandAnimation } from '@/components/Motion'

interface BrandProps {
	src: string
	alt: string
}

function Brand({ src, alt }: BrandProps) {
	return (
		<div className="absolute inset-0 z-10 flex h-screen w-full items-center justify-center">
			<BrandAnimation>
				<Image
					src={src}
					alt={alt}
					width={200}
					height={200}
				/>
			</BrandAnimation>
		</div>
	)
}

export default Brand
