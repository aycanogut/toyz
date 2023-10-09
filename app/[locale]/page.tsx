import Brand from '@/components/Brand'
import Header from '@/components/Header'
import LanguagePicker from '@/components/LanguagePicker.tsx'
import VideoOverlay from '@/components/VideoOverlay'
import { locales } from '@/routes/locales'
import { navigation } from '@/routes/navigation'

export default function Home() {
	return (
		<>
			<Header items={navigation} />

			<main className="relative flex h-screen items-center justify-center">
				<Brand
					src="/assets/logo.png"
					alt="toyz logo"
				/>

				<LanguagePicker locales={locales} />

				<VideoOverlay src="/assets/v.mp4" />
			</main>
		</>
	)
}
