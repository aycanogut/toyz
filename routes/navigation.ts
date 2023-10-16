import { type NavItemProps } from '@/types'

import { urls } from './urls'

export const navigation: NavItemProps[] = [
	{
		label: 'toyz',
		href: urls.Toyz,
	},
	{
		label: 'about',
		href: urls.About,
	},
]
