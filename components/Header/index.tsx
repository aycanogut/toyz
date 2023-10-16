import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { type NavItemProps } from '@/types'
interface HeadaerProps {
	items: NavItemProps[]
}

function Header({ items }: HeadaerProps) {
	const t = useTranslations('Navigation')

	if (!items?.length) {
		return null
	}

	return (
		<header className="fixed bottom-0 left-0 z-40 w-full bg-black">
			<nav>
				<ul className="flex w-full list-none justify-around">
					{items.map((item) => {
						return (
							item.href && (
								<li
									key={item.label}
									className="w-1/4 py-4 text-center sm:p-4"
								>
									<Link href={item.href}>
										<span className="whitespace-nowrap text-xs font-bold uppercase text-white sm:text-lg">
											{t(item.label)}
										</span>
									</Link>
								</li>
							)
						)
					})}
				</ul>
			</nav>
		</header>
	)
}

export default Header
