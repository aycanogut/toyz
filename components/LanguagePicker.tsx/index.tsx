import Link from 'next-intl/link'

interface LocaleProps {
	label: string
}

interface LanguagePickerProps {
	locales: LocaleProps[]
}

function LanguagePicker({ locales }: LanguagePickerProps) {
	return (
		<div className="absolute right-0 top-0 z-50 flex gap-3 bg-black p-2 font-bold  text-white">
			{locales.map((item: LocaleProps) => {
				return (
					<Link
						key={item.label}
						href="/"
						locale={item.label}
					>
						<span>{item.label}</span>
					</Link>
				)
			})}
		</div>
	)
}

export default LanguagePicker
