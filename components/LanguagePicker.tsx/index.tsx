'use client'

import { usePathname, useRouter } from 'next-intl/client'

interface LocaleProps {
	label: string
}

interface LanguagePickerProps {
	locales: LocaleProps[]
}

function LanguagePicker({ locales }: LanguagePickerProps) {
	const router = useRouter()
	const pathname = usePathname()

	const handleChange = (e: any) => {
		router.push(pathname, { locale: e.target.innerText })
	}

	return (
		<div className="absolute right-0 top-0 z-50 flex gap-3 bg-black p-2 font-bold  text-white">
			{locales.map((item: LocaleProps) => {
				return (
					<span
						key={item.label}
						onClick={handleChange}
						className="cursor-pointer font-golos"
					>
						<span>{item.label}</span>
					</span>
				)
			})}
		</div>
	)
}

export default LanguagePicker
